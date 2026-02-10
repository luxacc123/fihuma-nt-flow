import Image from "next/image";

interface StepWrapperProps {
  children: React.ReactNode;
  onBack?: () => void;
  stepKey: number;
}

export default function StepWrapper({
  children,
  onBack,
  stepKey,
}: StepWrapperProps) {
  return (
    <div key={stepKey} className="step-enter">
      <div className="relative bg-card rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] p-7 sm:p-9 mt-5 border border-border/60">
        {/* Fihuma logo — top-right, decorative */}
        <div className="absolute top-5 right-5 sm:top-7 sm:right-7 pointer-events-none">
          <Image
            src="/fihuma-logo.svg"
            alt=""
            width={80}
            height={20}
            className="h-5 w-auto opacity-40"
            priority
          />
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-400 hover:text-brand-dark-green transition-colors duration-200 mb-5 flex items-center gap-1.5 cursor-pointer group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Terug
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
