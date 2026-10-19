import { Check } from 'lucide-react';

export default function PaymentOption({ label, icon, selected, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`relative flex min-w-0 flex-col items-center justify-center gap-3 rounded-xl border p-4 text-sm transition-colors duration-200 sm:p-5 ${
        disabled
          ? 'cursor-not-allowed border-stone-200 bg-stone-50 text-stone-300'
          : selected
            ? 'border-stone-900 bg-stone-50 text-stone-900'
            : 'border-stone-200 bg-white text-stone-500 hover:border-stone-400 hover:text-stone-900'
      }`}
    >
      {selected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-white">
          <Check size={12} strokeWidth={2.5} />
        </span>
      )}

      <span className={selected ? 'text-stone-900' : 'text-stone-500'}>
        {icon}
      </span>

      <span className="font-medium">{label}</span>
    </button>
  );
}
