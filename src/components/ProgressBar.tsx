interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mx-auto mb-3">
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-xs text-gray-400 font-medium tracking-wide">
          Stap {current} van {total}
        </p>
        <p className="text-xs text-gray-300 font-medium tabular-nums">
          {Math.round(percentage)}%
        </p>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-green to-brand-green-hover rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
