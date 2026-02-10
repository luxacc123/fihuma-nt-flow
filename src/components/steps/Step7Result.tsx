import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import Button from "@/components/ui/Button";

export default function Step7Result({
  updateField,
  onNext,
}: StepProps) {
  const handleContinue = () => {
    updateField("preferred_contact", "PHONE");
    onNext();
  };

  return (
    <StepWrapper stepKey={7}>
      <div className="space-y-7 py-3">
        {/* Green checkmark — left-aligned */}
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-brand-green/5 -z-10" />
        </div>

        <div className="space-y-2.5">
          <h2 className="text-xl font-bold text-brand-blue leading-tight tracking-tight">
            Uw woning lijkt binnen de voorwaarden te vallen.
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            Plan een inspectie en ontdek wat er mogelijk is met subsidie.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={handleContinue}>Plan inspectie</Button>
          <a
            href="tel:+31853016509"
            className="w-full rounded-2xl font-medium text-sm text-gray-500 hover:text-brand-dark-green transition-colors flex items-center justify-center gap-2 py-2.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Bel direct: 085 301 65 09
          </a>
        </div>
      </div>
    </StepWrapper>
  );
}
