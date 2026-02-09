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
    "w-full rounded-2xl font-semibold text-base transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 min-h-[52px] px-6 py-4 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green";

  const variants = {
    primary:
      "bg-brand-green text-white hover:bg-brand-green-hover active:scale-[0.98] shadow-[0_2px_8px_rgba(103,173,89,0.25)] hover:shadow-[0_4px_16px_rgba(103,173,89,0.3)]",
    secondary:
      "bg-white border border-border text-brand-dark-green hover:bg-card-hover hover:border-border-hover active:scale-[0.98] shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
    ghost:
      "bg-transparent text-gray-500 hover:text-brand-dark-green min-h-0 py-2.5 text-sm font-medium",
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
