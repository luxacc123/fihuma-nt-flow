import Button from "@/components/ui/Button";
import StepWrapper from "@/components/StepWrapper";

interface Step0Props {
  onNext: () => void;
}

export default function Step0Hero({ onNext }: Step0Props) {
  return (
    <StepWrapper stepKey={0}>
      <div className="text-center space-y-8 py-4">
        {/* Shield / trust icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-green-light to-brand-green-glow flex items-center justify-center pulse-soft">
            <svg
              className="w-8 h-8 text-brand-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-3.5">
          <h1 className="text-[22px] sm:text-2xl font-bold text-brand-blue leading-tight tracking-tight">
            Check in 30 seconden of u mogelijk in aanmerking komt voor isolatie-subsidie.
          </h1>
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm mx-auto">
            Beantwoord een paar korte vragen en ontvang direct een indicatie.
          </p>
        </div>

        <Button onClick={onNext}>Start de check</Button>
      </div>
    </StepWrapper>
  );
}
