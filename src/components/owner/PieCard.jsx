function describeArc(cx, cy, r, startDeg, endDeg) {
  const angle = (deg) => ((deg - 90) * Math.PI) / 180;

  const x1 = cx + r * Math.cos(angle(startDeg));
  const y1 = cy + r * Math.sin(angle(startDeg));
  const x2 = cx + r * Math.cos(angle(endDeg));
  const y2 = cy + r * Math.sin(angle(endDeg));

  const largeArc = endDeg - startDeg > 180 ? 1 : 0;

  return [
    `M ${x1} ${y1}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
  ].join(' ');
}

export default function PieCard({ title, data }) {
  const entries = Object.entries(data || {}).filter(
    ([key, value]) => Number(value) > 0 && key !== 'takeaway',
  );

  const total = entries.reduce(
    (sum, [, value]) => sum + Number(value),
    0
  );

  const colors = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#F87171',
    '#8B5CF6',
    '#94A3B8',
  ];

  let offset = 0;

  return (
    <section className="h-full rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-stone-800">
            {title}
          </h3>
          <p className="mt-1 text-xs text-stone-400">
            Ringkasan distribusi
          </p>
        </div>

        <span className="text-xs tabular-nums text-stone-400">
          {entries.length} kategori
        </span>
      </div>

      {total === 0 ? (
        <div className="flex min-h-44 flex-col items-center justify-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-50 text-xl text-stone-400">
            —
          </div>
          <p className="mt-3 text-sm font-medium text-stone-600">
            Belum ada data
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Distribusi akan muncul saat data tersedia.
          </p>
        </div>
      ) : (
        <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-6">
          <div className="relative w-36 shrink-0 sm:w-40">
            <svg
              viewBox="0 0 100 100"
              className="block w-full overflow-visible"
              role="img"
              aria-label={`Distribusi data dengan total ${total}`}
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="12"
              />

              {entries.map(([key, value], index) => {
                const percentage = (Number(value) / total) * 360;
                const start = offset;
                offset += percentage;

                return (
                  <path
                    key={key}
                    d={describeArc(50, 50, 38, start, offset)}
                    fill="none"
                    stroke={colors[index % colors.length]}
                    strokeWidth="12"
                    strokeLinecap="butt"
                    pathLength="100"
                    strokeDasharray={`${(Number(value) / total) * 100} 100`}
                    transform="rotate(0 50 50)"
                    style={{
                      strokeDashoffset: 0,
                    }}
                  />
                );
              })}
            </svg>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold tracking-tight tabular-nums text-stone-900">
                {total.toLocaleString('id-ID')}
              </span>
              <span className="mt-0.5 text-[10px] text-stone-400">
                Total
              </span>
            </div>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-4">
            {entries.map(([key, value], index) => {
              const percentage = (Number(value) / total) * 100;

              return (
                <div key={key} className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: colors[index % colors.length],
                        }}
                      />

                      <span className="truncate text-xs font-medium text-stone-600">
                        {key}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs font-semibold tabular-nums text-stone-800">
                      {Number(value).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="ml-5 mt-2 h-1 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: colors[index % colors.length],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}