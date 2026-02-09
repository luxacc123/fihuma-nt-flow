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
            Ontdek of uw woning in aanmerking komt voor isolatie met subsidie
          </h1>
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm mx-auto">
            Beantwoord een paar korte vragen en ontvang direct een indicatie.
            Wij begeleiden u vervolgens in het hele traject.
          </p>
        </div>

        <div className="space-y-4 pt-1">
          <Button onClick={onNext}>Start de check</Button>

          <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
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
      </div>
    </StepWrapper>
  );
}
