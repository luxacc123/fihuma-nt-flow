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
      <div className="text-center space-y-6 py-2">
        {/* Green checkmark */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-brand-green-light flex items-center justify-center">
            <svg
              className="w-8 h-8 text-brand-green"
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
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue leading-tight">
            Op basis van uw antwoorden lijkt het waarschijnlijk dat uw woning in
            aanmerking komt
          </h2>

          <div className="text-gray-600 text-base leading-relaxed space-y-1">
            <p>Wilt u isoleren met subsidie?</p>
            <p>Wij bekijken de mogelijkheden vrijblijvend met u</p>
            <p>en begeleiden u in het hele traject.</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button onClick={handlePhone}>Laat mij terugbellen</Button>
          <Button variant="ghost" onClick={handleEmail}>
            Liever contact per e-mail
          </Button>
        </div>
      </div>
    </StepWrapper>
  );
}
