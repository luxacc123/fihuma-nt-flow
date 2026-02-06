interface Option {
  value: string;
  label: string;
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
      // Clicking the exclusive option: select only it
      onChange(selected.includes(value) ? [] : [value]);
      return;
    }

    if (exclusiveValue && selected.includes(exclusiveValue)) {
      // Clicking a normal option while exclusive is selected: replace with this one
      onChange([value]);
      return;
    }

    // Normal toggle
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-base transition-all duration-200 cursor-pointer flex items-center justify-between min-h-[52px] ${
              isSelected
                ? "border-brand-green bg-brand-green-light text-brand-blue font-semibold shadow-sm"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span>{option.label}</span>
            <div
              className={`w-5 h-5 rounded border-2 shrink-0 ml-2 flex items-center justify-center transition-all duration-200 ${
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
