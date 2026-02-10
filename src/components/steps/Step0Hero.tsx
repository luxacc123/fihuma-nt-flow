import Button from "@/components/ui/Button";
import StepWrapper from "@/components/StepWrapper";

interface Step0Props {
  onNext: () => void;
}

export default function Step0Hero({ onNext }: Step0Props) {
  return (
    <StepWrapper stepKey={0}>
      <div className="text-center space-y-6 py-4">
        {/* Subtle house icon — visual anchor, not a badge */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/[0.07] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-brand-green/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>
        </div>

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
