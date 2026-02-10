interface CheckboxProps {
  label: React.ReactNode;
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
      <label className="flex items-start gap-3 cursor-pointer py-1.5">
        <div className="pt-0.5">
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`w-[18px] h-[18px] rounded-[5px] border shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer ${
              checked
                ? "bg-brand-green border-brand-green shadow-[0_0_0_1px_var(--color-brand-green)]"
                : error
                  ? "border-red-300 bg-white"
                  : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            {checked && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3.5}
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
          className={`text-[13px] leading-snug ${error ? "text-red-500" : "text-gray-500"}`}
          onClick={() => onChange(!checked)}
        >
          {label}
        </span>
      </label>
      {error && <p className="text-xs text-red-500 mt-0.5 ml-[30px]">{error}</p>}
    </div>
  );
}
