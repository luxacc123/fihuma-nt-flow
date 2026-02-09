interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  placeholder?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
}

export default function TextInput({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  placeholder,
  error,
  required = false,
  maxLength,
  autoComplete,
  multiline = false,
  rows = 3,
}: TextInputProps) {
  const inputClasses = `w-full rounded-xl border px-4 py-3.5 text-[15px] outline-none transition-all duration-200 bg-white placeholder:text-gray-300 ${
    error
      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-50"
      : "border-border focus:border-brand-green focus:ring-2 focus:ring-brand-green-light hover:border-border-hover"
  }`;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-600 tracking-tight">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={inputClasses}
        />
      )}
      {error && (
        <p className="text-[13px] text-red-500 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
