import StepWrapper from "@/components/StepWrapper";

export default function Step9ThankYou() {
  return (
    <StepWrapper stepKey={10}>
      <div className="space-y-8 py-3">
        {/* Success icon — left-aligned */}
        <div className="relative w-fit">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-green-light to-brand-green-glow flex items-center justify-center pulse-soft">
            <svg
              className="w-7 h-7 text-brand-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-brand-green/5 -z-10" />
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-brand-blue tracking-tight">
            Aanvraag ontvangen
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            Bedankt &mdash; wij nemen contact met u op om een inspectie in te plannen.
          </p>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            Samen bekijken we welke isolatie en subsidies voor uw woning mogelijk zijn.
          </p>
        </div>

        <div className="mt-2">
          <div className="bg-gray-50 rounded-2xl border border-border/60 px-6 py-5">
            <p className="text-sm font-medium text-gray-500">
              Direct contact
            </p>
            <a
              href="tel:+31853016509"
              className="inline-flex items-center gap-2.5 mt-3 text-brand-green font-semibold text-base hover:text-brand-green-hover transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              085 301 65 09
            </a>
          </div>
        </div>
      </div>
    </StepWrapper>
  );
}
