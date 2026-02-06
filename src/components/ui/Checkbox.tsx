interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export default function Checkbox({
  label,
  checked,
  onChange,
  error,
}: CheckboxProps) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer py-1">
        <div className="pt-0.5">
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer ${
              checked
                ? "bg-brand-green border-brand-green"
                : error
                  ? "border-red-400 bg-white"
                  : "border-gray-300 bg-white"
            }`}
          >
            {checked && (
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
          </button>
        </div>
        <span
          className={`text-sm leading-snug ${error ? "text-red-500" : "text-gray-600"}`}
          onClick={() => onChange(!checked)}
        >
          {label}
        </span>
      </label>
      {error && <p className="text-xs text-red-500 mt-1 ml-8">{error}</p>}
    </div>
  );
}
