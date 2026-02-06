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
  const inputClasses = `w-full rounded-xl border-2 px-4 py-3.5 text-base outline-none transition-all duration-200 bg-white ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green-light"
  }`;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
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
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
