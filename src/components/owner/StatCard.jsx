export default function StatCard({ label, value, icon: Icon, color }) {
  const colorMap = {
    blue: {
      icon: 'bg-blue-50 text-blue-600',
      value: 'text-blue-700',
    },
    green: {
      icon: 'bg-emerald-50 text-emerald-700',
      value: 'text-stone-900',
    },
    emerald: {
      icon: 'bg-emerald-50 text-emerald-700',
      value: 'text-stone-900',
    },
    amber: {
      icon: 'bg-amber-50 text-amber-700',
      value: 'text-stone-900',
    },
    rose: {
      icon: 'bg-rose-50 text-rose-700',
      value: 'text-stone-900',
    },
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className="min-w-0 rounded-2xl border border-stone-200/80 bg-white p-5 transition-colors hover:border-stone-300 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-sm font-medium text-stone-500">
          {label}
        </p>

        {Icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
          >
            <Icon size={18} strokeWidth={1.8} />
          </div>
        )}
      </div>

      <p
        className={`mt-5 truncate text-3xl font-semibold tracking-[-0.045em] tabular-nums sm:text-4xl ${theme.value}`}
      >
        {value}
      </p>
    </div>
  );
}