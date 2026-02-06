interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const base =
    "w-full rounded-2xl font-semibold text-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 min-h-[52px] px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-brand-green text-white hover:bg-brand-green-hover active:scale-[0.98] shadow-sm",
    secondary:
      "bg-white border-2 border-brand-dark-green text-brand-dark-green hover:bg-gray-50 active:scale-[0.98]",
    ghost:
      "bg-transparent text-brand-dark-green hover:text-brand-blue underline underline-offset-2 min-h-0 py-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
