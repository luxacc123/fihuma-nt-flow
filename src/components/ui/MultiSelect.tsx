interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  exclusiveValue?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  exclusiveValue,
}: MultiSelectProps) {
  const handleToggle = (value: string) => {
    if (exclusiveValue && value === exclusiveValue) {
      onChange(selected.includes(value) ? [] : [value]);
      return;
    }

    if (exclusiveValue && selected.includes(exclusiveValue)) {
      onChange([value]);
      return;
    }

    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2.5">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            className={`w-full rounded-2xl border px-5 py-4 text-left text-[15px] transition-all duration-200 cursor-pointer flex items-center justify-between min-h-[52px] ${
              isSelected
                ? "border-brand-green bg-brand-green-light text-brand-blue font-semibold shadow-[0_0_0_1px_var(--color-brand-green),0_2px_8px_var(--color-brand-green-glow)]"
                : "border-border bg-white text-gray-600 hover:border-border-hover hover:bg-card-hover"
            }`}
          >
            <div className="flex items-center gap-3">
              {option.icon && (
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    isSelected ? "bg-brand-green/10" : "bg-gray-50"
                  }`}
                >
                  {option.icon}
                </div>
              )}
              <span>{option.label}</span>
            </div>
            <div
              className={`w-5 h-5 rounded-md border-2 shrink-0 ml-3 flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? "bg-brand-green border-brand-green"
                  : "border-gray-300 bg-white"
              }`}
            >
              {isSelected && (
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
