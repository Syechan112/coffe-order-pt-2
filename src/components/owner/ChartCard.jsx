export default function ChartCard({ title, data }) {
  const items = data || [];

  const maxValue = Math.max(
    ...items.map((item) => Number(item.value ?? item.revenue ?? 0)),
    1
  );

  return (
    <section className="rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-tight text-stone-800">
          {title}
        </h3>

        <span className="text-xs text-stone-400">
          {items.length} data
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 text-stone-400">
            <span className="text-lg">—</span>
          </div>
          <p className="text-sm font-medium text-stone-600">
            Belum ada data
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Data grafik akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="flex h-48 items-end gap-2 sm:gap-3">
          {items.map((item, index) => {
            const value = Number(item.value ?? item.revenue ?? 0);
            const height = Math.max((value / maxValue) * 100, 2);
            const label =
              item.name || `H${String(item.hour ?? index).padStart(2, '0')}`;

            return (
              <div
                key={`${label}-${index}`}
                className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end"
              >
                <div className="mb-2 min-h-4 text-center">
                  <span className="text-[10px] font-medium tabular-nums text-stone-500 opacity-0 transition-opacity group-hover:opacity-100">
                    {value.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex h-full w-full items-end justify-center overflow-hidden rounded-t-lg">
                  <div
                    className="w-full max-w-8 rounded-t-lg bg-blue-500 transition-all duration-300 group-hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                    title={`${label}: ${value.toLocaleString('id-ID')}`}
                  />
                </div>

                <span
                  className="mt-3 w-full truncate text-center text-[10px] text-stone-400"
                  title={label}
                >
                  {item.quantity ? `${item.quantity}× ` : ''}
                  {item.name ? item.name.split(' ')[0] : label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}