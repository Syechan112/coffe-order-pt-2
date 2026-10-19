import { ClipboardList, CheckCircle2 } from 'lucide-react';

export default function StatusSummary({ preparingCount, readyCount }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-2 text-stone-500">
          <ClipboardList size={15} />
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] sm:text-xs">
            Sedang diproses
          </span>
        </div>

        <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-stone-900 sm:text-4xl">
          {String(preparingCount).padStart(2, '0')}
        </p>

        <p className="mt-1 text-[11px] text-stone-400 sm:text-xs">
          Pesanan dalam antrean
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-2 text-amber-800">
          <CheckCircle2 size={15} />
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] sm:text-xs">
            Siap diambil
          </span>
        </div>

        <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-amber-800 sm:text-4xl">
          {String(readyCount).padStart(2, '0')}
        </p>

        <p className="mt-1 text-[11px] text-amber-700/70 sm:text-xs">
          Menunggu pengambilan
        </p>
      </div>
    </div>
  );
}
