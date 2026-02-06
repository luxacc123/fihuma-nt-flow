interface Option {
  value: string;
  label: string;
}

interface SingleSelectProps {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

export default function SingleSelect({
  options,
  selected,
  onChange,
}: SingleSelectProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-base transition-all duration-200 cursor-pointer flex items-center justify-between min-h-[52px] ${
              isSelected
                ? "border-brand-green bg-brand-green-light text-brand-blue font-semibold shadow-sm"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span>{option.label}</span>
            {isSelected && (
              <svg
                className="w-5 h-5 text-brand-green shrink-0 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
