import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacyverklaring - Fihuma Isolatie",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-5 py-8 sm:py-14">
      <div className="w-full max-w-[600px]">
        <div className="bg-card rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] p-7 sm:p-9 border border-border/60">
          <div className="space-y-6">
            <h1 className="text-xl font-bold text-brand-blue tracking-tight">
              Privacyverklaring
            </h1>

            <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed">
              <h2 className="text-base font-semibold text-brand-blue pt-2">
                Waar gebruiken wij uw gegevens voor?
              </h2>
              <p>
                Via dit formulier verzamelen wij uw naam, telefoonnummer,
                e-mailadres en adresgegevens. We gebruiken deze gegevens
                uitsluitend om contact met u op te nemen over
                isolatiemogelijkheden en eventuele subsidies voor uw woning.
              </p>

              <h2 className="text-base font-semibold text-brand-blue pt-2">
                Hoe nemen wij contact op?
              </h2>
              <p>
                Wij nemen bij voorkeur telefonisch contact met u op om de
                mogelijkheden te bespreken en eventueel een inspectie in te
                plannen.
              </p>

              <h2 className="text-base font-semibold text-brand-blue pt-2">
                Delen wij uw gegevens?
              </h2>
              <p>
                Nee. Wij verkopen of verstrekken uw gegevens niet aan derden.
                Uw informatie blijft bij Fihuma.
              </p>

              <h2 className="text-base font-semibold text-brand-blue pt-2">
                Hoe lang bewaren wij uw gegevens?
              </h2>
              <p>
                Niet langer dan nodig. Zodra het doel waarvoor we uw gegevens
                hebben verzameld is bereikt, worden ze verwijderd.
              </p>

              <h2 className="text-base font-semibold text-brand-blue pt-2">
                Gegevens verwijderen?
              </h2>
              <p>
                Wilt u dat wij uw gegevens verwijderen? Dat kan. Neem contact
                met ons op en wij regelen het.
              </p>

              <h2 className="text-base font-semibold text-brand-blue pt-2">
                Contact
              </h2>
              <p>
                Heeft u vragen? Bel ons op{" "}
                <a
                  href="tel:0883038200"
                  className="text-brand-green hover:text-brand-green-hover font-medium"
                >
                  088-303 82 00
                </a>
                .
              </p>
            </div>

            <div className="pt-4 border-t border-border/60">
              <Link
                href="/"
                className="text-sm text-brand-green hover:text-brand-green-hover font-medium"
              >
                &larr; Terug naar de check
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
