import Button from "@/components/ui/Button";
import StepWrapper from "@/components/StepWrapper";

interface Step0Props {
  onNext: () => void;
}

export default function Step0Hero({ onNext }: Step0Props) {
  return (
    <StepWrapper stepKey={0}>
      <div className="text-center space-y-8 py-4">
        <div className="space-y-3.5">
          <h1 className="text-[22px] sm:text-2xl font-bold text-brand-blue leading-tight tracking-tight">
            Veel woningen komen in aanmerking voor isolatiesubsidie.
          </h1>
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm mx-auto">
            Geldt dit ook voor uw woning? Doe de check en ontdek het direct.
          </p>
        </div>

        <Button onClick={onNext}>Start de check</Button>
      </div>
    </StepWrapper>
  );
}
