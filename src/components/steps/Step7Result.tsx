import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import Button from "@/components/ui/Button";

export default function Step7Result({
  updateField,
  onNext,
}: StepProps) {
  const handlePhone = () => {
    updateField("preferred_contact", "PHONE");
    onNext();
  };

  const handleEmail = () => {
    updateField("preferred_contact", "EMAIL");
    onNext();
  };

  return (
    <StepWrapper stepKey={7}>
      <div className="text-center space-y-7 py-3">
        {/* Animated green checkmark */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-brand-green-light to-brand-green-glow flex items-center justify-center pulse-soft">
              <svg
                className="w-9 h-9 text-brand-green"
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
            {/* Subtle glow ring */}
            <div className="absolute -inset-2 rounded-3xl bg-brand-green/5 -z-10" />
          </div>
        </div>

        <div className="space-y-3 max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-brand-blue leading-tight tracking-tight">
            Uw woning lijkt binnen de voorwaarden te vallen.
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            Plan een korte inspectie en ontdek wat er mogelijk is.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={handlePhone}>Plan inspectie</Button>
          <Button variant="ghost" onClick={handleEmail}>
            Liever contact per e-mail
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-3 text-xs text-gray-400 pt-1">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Vrijblijvend
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Kosteloos
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Geen verplichtingen
          </span>
        </div>
      </div>
    </StepWrapper>
  );
}
