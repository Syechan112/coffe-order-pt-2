import { Coffee, CheckCircle2 } from 'lucide-react';

export default function DisplayColumn({ title, subtitle, orders, tone }) {
  const isReady = tone === 'ready';

  return (
    <section
      aria-label={title}
      className={`flex min-h-[360px] flex-col overflow-hidden rounded-xl border shadow-sm sm:min-h-[440px] ${
        isReady
          ? 'border-amber-200 bg-amber-50/40'
          : 'border-stone-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-stone-200 px-4 py-4 sm:px-5 sm:py-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                isReady ? 'bg-amber-600' : 'bg-stone-400'
              }`}
            />
            <h2
              className={`text-sm font-semibold tracking-tight sm:text-base ${
                isReady ? 'text-amber-800' : 'text-stone-800'
              }`}
            >
              {title}
            </h2>
          </div>

          <p className="mt-1.5 text-[11px] leading-5 text-stone-500 sm:text-xs">
            {subtitle}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-lg px-2.5 py-1 font-mono text-lg font-semibold tabular-nums sm:text-xl ${
            isReady
              ? 'bg-amber-200 text-amber-950'
              : 'bg-stone-100 text-stone-700'
          }`}
        >
          {String(orders.length).padStart(2, '0')}
        </span>
      </div>

      <OrdersList orders={orders} isReady={isReady} />
    </section>
  );
}

function OrdersList({ orders, isReady }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${
            isReady
              ? 'border-amber-200 bg-amber-50 text-amber-700'
              : 'border-stone-200 bg-stone-50 text-stone-400'
          }`}
        >
          {isReady ? (
            <CheckCircle2 size={21} strokeWidth={1.5} />
          ) : (
            <Coffee size={21} strokeWidth={1.5} />
          )}
        </div>

        <p className="text-sm font-medium text-stone-700">
          {isReady ? 'Belum ada pesanan siap' : 'Tidak ada antrean'}
        </p>
        <p className="mt-1.5 max-w-[220px] text-xs leading-5 text-stone-500">
          {isReady
            ? 'Nomor pesanan akan muncul di sini setelah siap diambil.'
            : 'Pesanan baru akan ditampilkan di sini.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid flex-1 content-start grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-4 xl:grid-cols-3">
      {orders.map((order, index) => (
        <article
          key={order.id}
          className={`relative flex min-h-[145px] flex-col justify-between rounded-lg border p-3.5 sm:min-h-[175px] sm:p-5 ${
            isReady
              ? 'border-amber-300 bg-amber-100 text-amber-950'
              : 'border-stone-200 bg-white text-stone-900'
          }`}
        >
          <OrderCardHeader index={index} isReady={isReady} />

          <div className="py-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-stone-500">
              Nomor pesanan
            </p>
            <p className="mt-1 break-all text-3xl font-bold tabular-nums tracking-tight sm:text-4xl xl:text-[2.75rem]">
              #{String(order.orderNumber).padStart(2, '0')}
            </p>
          </div>

          <div
            className={`border-t pt-2.5 text-[10px] font-medium sm:text-xs ${
              isReady
                ? 'border-amber-300 text-amber-900'
                : 'border-stone-200 text-stone-500'
            }`}
          >
            {order.type === 'dine-in'
              ? `Meja ${order.table || '-'}`
              : 'Takeaway'}
          </div>
        </article>
      ))}
    </div>
  );
}

function OrderCardHeader({ index, isReady }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span
        className={`text-[9px] font-semibold uppercase tracking-[0.12em] sm:text-[10px] ${
          isReady ? 'text-amber-800' : 'text-stone-400'
        }`}
      >
        Antrean {index + 1}
      </span>

      {isReady && <CheckCircle2 size={15} className="shrink-0 text-amber-800" />}
    </div>
  );
}
