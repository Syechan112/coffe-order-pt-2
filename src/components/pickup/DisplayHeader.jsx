import { Coffee, Clock3, Maximize2, Minimize2 } from 'lucide-react';

export default function DisplayHeader({ clock, isFullscreen, onToggleFullscreen }) {
  return (
    <header className="mb-7 flex flex-col gap-5 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white">
          <Coffee size={23} strokeWidth={1.7} className="text-amber-700" />
        </div>

        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-700">
            BrewFlow · Pickup
          </p>

          <h1 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
            Order Display
          </h1>

          <p className="mt-1 text-xs leading-5 text-stone-500 sm:text-sm">
            Silakan perhatikan nomor pesanan Anda.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center gap-3">
          <Clock3 size={17} className="text-stone-400" />

          <div>
            <p className="font-mono text-2xl font-medium tabular-nums tracking-tight text-stone-900 sm:text-3xl">
              {clock.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </p>

            <p className="mt-0.5 text-right text-[10px] uppercase tracking-wider text-stone-400">
              Waktu lokal
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleFullscreen}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-3 text-xs font-medium text-stone-600 transition-colors hover:border-stone-300 hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
        </button>
      </div>
    </header>
  );
}
