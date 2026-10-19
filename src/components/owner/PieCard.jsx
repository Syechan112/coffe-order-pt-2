function describeArc(cx, cy, r, startDeg, endDeg) {
  const a = (d) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(a(startDeg - 90));
  const y1 = cy + r * Math.sin(a(startDeg - 90));
  const x2 = cx + r * Math.cos(a(endDeg - 90));
  const y2 = cy + r * Math.sin(a(endDeg - 90));
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${cx} ${cy} Z`;
}

export default function PieCard({ title, data }) {
  const total = Object.values(data || {}).reduce((a, b) => a + b, 0) || 0;
  const colors = ['#2F80ED', '#00C9A7', '#F2C94C', '#EB5757', '#9B51E6', '#6A7DFF'];
  const entries = Object.entries(data || {});
  let offset = 0;

  return (
    <div className="p-4 bg-white rounded-2xl border border-border-subtle h-fit">
      <h3 className="text-sm font-medium mb-3">{title}</h3>
      {total === 0 ? (
        <p className="text-sm text-text-muted py-4">No data available</p>
      ) : (
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100">
              {entries.map(([key, value], index) => {
                const pct = (value / total) * 360;
                const start = offset;
                offset += pct;
                return (
                  <path
                    key={key}
                    d={describeArc(50, 50, 42, start, offset)}
                    fill={colors[index % colors.length]}
                  />
                );
              })}
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {total}
            </span>
          </div>
          <div className="space-y-1.5">
            {entries.map(([key, value], index) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors[index % colors.length] }} />
                <span className="text-text-secondary">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
