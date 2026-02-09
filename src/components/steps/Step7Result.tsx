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
    <StepWrapper stepKey={8}>
      <div className="text-center space-y-8 py-3">
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

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue leading-tight tracking-tight">
            Uw woning lijkt geschikt voor isolatie met subsidie
          </h2>

          <div className="text-gray-400 text-[15px] leading-relaxed max-w-sm mx-auto">
            <p>
              Op basis van uw antwoorden lijkt uw woning binnen de voorwaarden
              te vallen van de subsidieregeling.
            </p>
            <p className="mt-2.5">
              Wij komen vrijblijvend bij u langs om de mogelijkheden te bekijken
              en begeleiden u in het hele traject.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-3 text-xs text-gray-300 font-medium uppercase tracking-widest">
              Volgende stap
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={handlePhone}>Plan vrijblijvende inspectie</Button>
          <Button variant="ghost" onClick={handleEmail}>
            Liever contact per e-mail
          </Button>
        </div>
      </div>
    </StepWrapper>
  );
}
