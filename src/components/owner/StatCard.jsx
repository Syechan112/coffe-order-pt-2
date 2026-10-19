export default function StatCard({ label, value, icon: Icon, color }) {
  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-600',
    green: 'bg-emerald-500/10 text-emerald-600',
    emerald: 'bg-emerald-500/10 text-emerald-600',
    amber: 'bg-amber-500/10 text-amber-600',
    rose: 'bg-rose-500/10 text-rose-600',
  };
  const bg = colorMap[color] || colorMap.blue;

  return (
    <div className="p-4 bg-white rounded-2xl border border-border-subtle">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-xl ${bg.split(' ')[0]} flex items-center justify-center`}>
          <Icon size={18} className={bg.split(' ')[1]} />
        </div>
        <span className="text-xs font-medium text-text-muted">{label}</span>
      </div>
      <p className="text-2xl font-bold text-espresso">{value}</p>
    </div>
  );
}
