import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter — max 3 requests per IP per 10 minutes
// ---------------------------------------------------------------------------

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  ipHits.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

// ---------------------------------------------------------------------------
// PDOK Locatieserver — city, municipality, street + adresseerbaarobject_id
// ---------------------------------------------------------------------------

interface PdokAddress {
  city: string | null;
  municipality: string | null;
  street: string | null;
  adresseerbaarobjectId: string | null;
}

async function lookupPdok(
  postcode: string,
  houseNumber: number
): Promise<PdokAddress> {
  const result: PdokAddress = {
    city: null,
    municipality: null,
    street: null,
    adresseerbaarobjectId: null,
  };

  try {
    const pc = postcode.replace(/\s/g, "").toUpperCase();
    const query = encodeURIComponent(`${pc} ${houseNumber}`);
    const url = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${query}&rows=1&fq=type:adres`;

    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return result;

    const data = await res.json();
    const docs: Array<Record<string, string>> = data?.response?.docs ?? [];

    if (docs.length === 0) return result;

    const doc = docs[0];
    result.city = doc.woonplaatsnaam ?? null;
    result.municipality = doc.gemeentenaam ?? null;
    result.street = doc.straatnaam ?? null;
    result.adresseerbaarobjectId = doc.adresseerbaarobject_id ?? null;

  } catch {
    // PDOK lookup failed — non-blocking, continue with insert
  }

  return result;
}

// ---------------------------------------------------------------------------
// BAG OGC API v2 — verblijfsobject + pand details (public, no key needed)
// ---------------------------------------------------------------------------

const BAG_BASE = "https://api.pdok.nl/kadaster/bag/ogc/v2";

interface BagData {
  bag_verblijfsobject_id: string | null;
  bag_pand_id: string | null;
  build_year: number | null;
  surface_m2: number | null;
  usage_goal: string | null;
}

async function lookupBag(
  adresseerbaarobjectId: string | null
): Promise<BagData> {
  const result: BagData = {
    bag_verblijfsobject_id: null,
    bag_pand_id: null,
    build_year: null,
    surface_m2: null,
    usage_goal: null,
  };

  if (!adresseerbaarobjectId) return result;

  try {
    // Step 1: verblijfsobject by identificatie
    const vboUrl = `${BAG_BASE}/collections/verblijfsobject/items?f=json&limit=1&identificatie=${adresseerbaarobjectId}`;
    const vboRes = await fetch(vboUrl, { signal: AbortSignal.timeout(4000) });

    if (!vboRes.ok) return result;

    const vboData = await vboRes.json();
    const vboFeatures = vboData?.features ?? [];

    if (vboFeatures.length === 0) return result;

    const vbo = vboFeatures[0].properties;
    result.bag_verblijfsobject_id = vbo.identificatie ?? adresseerbaarobjectId;
    result.surface_m2 = typeof vbo.oppervlakte === "number" ? vbo.oppervlakte : null;
    result.usage_goal = vbo.gebruiksdoel ?? null;

    // Step 2: pand via pand.href link
    const pandHrefs: string[] = vbo["pand.href"] ?? [];
    if (pandHrefs.length > 0) {
      const pandUrl = `${pandHrefs[0]}?f=json`;
      const pandRes = await fetch(pandUrl, { signal: AbortSignal.timeout(4000) });

      if (pandRes.ok) {
        const pandData = await pandRes.json();
        const pand = pandData?.properties ?? pandData;
        result.bag_pand_id = pand.identificatie ?? null;
        result.build_year = typeof pand.bouwjaar === "number" ? pand.bouwjaar : null;
      }
    }

  } catch {
    // BAG lookup failed — non-blocking, continue with insert
  }

  return result;
}

// ---------------------------------------------------------------------------
// POST /api/lead
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Honeypot check — bots fill the hidden "website" field
    if (body.website) {
      return new NextResponse(null, { status: 204 });
    }

    // Validate required fields
    const requiredFields = ["postcode", "house_number", "contact_name", "phone"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Veld '${field}' is verplicht` },
          { status: 400 }
        );
      }
    }

    // Validate consent
    if (!body.consent_contact || !body.consent_privacy) {
      return NextResponse.json(
        { error: "Toestemming is verplicht" },
        { status: 400 }
      );
    }

    // Validate email if preferred contact is email
    if (body.preferred_contact === "EMAIL" && !body.email) {
      return NextResponse.json(
        { error: "E-mailadres is verplicht bij voorkeur voor e-mail" },
        { status: 400 }
      );
    }

    // Parse house_number to integer
    const houseNumber = parseInt(body.house_number, 10);
    if (isNaN(houseNumber)) {
      return NextResponse.json(
        { error: "Huisnummer moet een geldig nummer zijn" },
        { status: 400 }
      );
    }

    // PDOK address enrichment (best-effort, never blocks insert)
    const pdok = await lookupPdok(body.postcode, houseNumber);

    // BAG building enrichment (best-effort, uses adresseerbaarobject_id from PDOK)
    const bag = await lookupBag(pdok.adresseerbaarobjectId);

    // Explicit field mapping — never blind-insert the body
    const row = {
      campaign_code: body.campaign_code || "fihuma_nt",
      postcode: body.postcode,
      house_number: houseNumber,
      house_number_addition: body.house_number_addition || null,
      city: pdok.city,
      municipality: pdok.municipality,
      street: pdok.street,
      bag_verblijfsobject_id: bag.bag_verblijfsobject_id,
      bag_pand_id: bag.bag_pand_id,
      build_year: bag.build_year,
      surface_m2: bag.surface_m2,
      usage_goal: bag.usage_goal,
      energy_label_choice: body.energy_label_choice || null,
      woz_band: body.woz_band || null,
      housing_situation: body.housing_situation || null,
      dwelling_type_user: body.dwelling_type_user || null,
      poor_parts: Array.isArray(body.poor_parts)
        ? body.poor_parts.join(";")
        : body.poor_parts || null,
      already_insulated_parts: Array.isArray(body.already_insulated_parts)
        ? body.already_insulated_parts.join(";")
        : body.already_insulated_parts || null,
      considering_insulation: body.considering_insulation || null,
      pain_points: Array.isArray(body.pain_points)
        ? body.pain_points.join(";")
        : body.pain_points || null,
      paste_text: body.paste_text || null,
      contact_name: body.contact_name,
      phone: body.phone,
      email: body.email || null,
      preferred_contact: body.preferred_contact || "PHONE",
      consent_contact: body.consent_contact,
      consent_privacy: body.consent_privacy,
      utm_source: body.utm_source || "direct",
      utm_medium: body.utm_medium || "none",
      utm_campaign: body.utm_campaign || "unknown",
      utm_term: body.utm_term || null,
      utm_content: body.utm_content || "na",
      landing_version: body.landing_version || "v2",
    };

    const supabase = getSupabaseClient();
    const { error } = await supabase.from("fihuma_nt_leads").insert([row]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Opslaan mislukt. Probeer het opnieuw." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}
