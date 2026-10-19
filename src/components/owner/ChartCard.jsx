export default function ChartCard({ title, data }) {
  const maxValue = Math.max(...(data || []).map((d) => d.value || d.revenue || 1), 1);

  return (
    <div className="p-4 bg-white rounded-2xl border border-border-subtle h-64">
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <div className="h-52 flex items-end justify-between">
        {(data || []).length === 0 ? (
          <p className="text-sm text-text-muted w-full text-center py-6">No data yet</p>
        ) : (
          (data || []).map((d, i) => {
            const value = d.value || d.revenue || 0;
            const height = Math.max(4, (value / maxValue) * 100);
            const label = d.name || `H${String(d.hour).padStart(2, '0')}`;
            return (
              <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                <div
                  className="w-2 bg-accent rounded-t transition-all duration-500"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[8px] text-text-muted mt-1 truncate w-full text-center">
                  {d.quantity ? `${d.quantity}×` : ''}
                  {d.name ? d.name.split(' ')[0] : label}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
