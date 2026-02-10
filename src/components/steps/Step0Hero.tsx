import Button from "@/components/ui/Button";
import StepWrapper from "@/components/StepWrapper";

interface Step0Props {
  onNext: () => void;
}

export default function Step0Hero({ onNext }: Step0Props) {
  return (
    <StepWrapper stepKey={0}>
      <div className="text-center space-y-8 py-4">
        <div className="space-y-3.5 max-w-[340px] sm:max-w-none mx-auto">
          <h1 className="text-[22px] sm:text-2xl font-bold text-brand-blue leading-tight tracking-tight text-balance">
            Veel woningen komen in aanmerking voor gemeentelijke subsidie.
          </h1>
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm mx-auto text-balance">
            Geldt dit ook voor uw woning? Controleer het eenvoudig met een korte check.
          </p>
        </div>

        <Button onClick={onNext}>Start de check</Button>
      </div>
    </StepWrapper>
  );
}
