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
      <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-400 hover:text-brand-dark-green transition-colors mb-4 flex items-center gap-1 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
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
