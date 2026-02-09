import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

interface PdokAddress {
  city: string | null;
  municipality: string | null;
  street: string | null;
}

async function lookupPdok(
  postcode: string,
  houseNumber: number
): Promise<PdokAddress> {
  const result: PdokAddress = { city: null, municipality: null, street: null };

  try {
    const pc = postcode.replace(/\s/g, "").toUpperCase();
    const query = encodeURIComponent(`${pc} ${houseNumber}`);
    const url = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${query}&rows=1`;

    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) {
      console.warn(`[PDOK] fail pc=${pc} nr=${houseNumber} err=HTTP ${res.status}`);
      return result;
    }

    const data = await res.json();
    const docs: Array<Record<string, string>> = data?.response?.docs ?? [];

    if (docs.length === 0) {
      console.warn(`[PDOK] fail pc=${pc} nr=${houseNumber} err=no docs returned`);
      return result;
    }

    const doc = docs[0];
    result.city = doc.woonplaatsnaam ?? null;
    result.municipality = doc.gemeentenaam ?? null;
    result.street = doc.straatnaam ?? null;

    console.log(`[PDOK] ok pc=${pc} nr=${houseNumber} city=${result.city} municipality=${result.municipality}`);
  } catch (err) {
    const pc = postcode.replace(/\s/g, "").toUpperCase();
    console.warn(`[PDOK] fail pc=${pc} nr=${houseNumber} err=${err instanceof Error ? err.message : err}`);
  }

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    // Explicit field mapping — never blind-insert the body
    const row = {
      campaign_code: body.campaign_code || "fihuma_nt",
      postcode: body.postcode,
      house_number: houseNumber,
      house_number_addition: body.house_number_addition || null,
      city: pdok.city,
      municipality: pdok.municipality,
      energy_label_choice: body.energy_label_choice || null,
      woz_band: body.woz_band || null,
      poor_parts: Array.isArray(body.poor_parts)
        ? body.poor_parts.join(";")
        : body.poor_parts || null,
      already_insulated_parts: Array.isArray(body.already_insulated_parts)
        ? body.already_insulated_parts.join(";")
        : body.already_insulated_parts || null,
      considering_insulation: body.considering_insulation || null,
      pain_points: body.pain_points || null,
      paste_text: body.paste_text || null,
      contact_name: body.contact_name,
      phone: body.phone,
      email: body.email || null,
      preferred_contact: body.preferred_contact || "PHONE",
      consent_contact: body.consent_contact,
      consent_privacy: body.consent_privacy,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_term: body.utm_term || null,
      utm_content: body.utm_content || null,
      landing_version: body.landing_version || "v1",
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
