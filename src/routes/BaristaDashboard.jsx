import { useEffect, useState } from 'react';
import { Play, CheckCircle, Timer } from 'lucide-react';
import useBrewStore from '../store/useBrewStore';
import { Button, Badge } from '../components/UI';
import { ORDER_STATES } from '../services/orderTransitions';

export default function BaristaDashboard() {
  const { orders, startPreparing, markReady } = useBrewStore();
  const queue = orders.filter((o) => [ORDER_STATES.CONFIRMED, ORDER_STATES.PREPARING].includes(o.status));
  const ready = orders.filter((o) => o.status === ORDER_STATES.READY);
  return <div className="max-w-6xl mx-auto p-6">
    <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold">Barista KDS</h1><p className="text-text-secondary text-sm mt-1">Live production queue</p></div><Badge variant="success"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Live</Badge></div>
    <h2 className="font-semibold mb-3">Queue ({queue.length})</h2>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">{queue.map(o => <KitchenCard key={o.id} order={o} onStart={() => startPreparing(o.id)} onReady={() => markReady(o.id)} />)}</div>
    <h2 className="font-semibold mb-3">Ready for Pickup ({ready.length})</h2>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{ready.map(o => <div key={o.id} className="p-4 bg-white rounded-2xl border border-emerald-200"><div className="flex justify-between"><strong>#{o.orderNumber}</strong><Badge variant="success">Ready</Badge></div><p className="text-sm text-text-secondary mt-2">{o.items.map(i => `${i.quantity}× ${i.snapshotName}`).join(', ')}</p></div>)}</div>
  </div>;
}
function KitchenCard({ order, onStart, onReady }) { const [now, setNow] = useState(Date.now()); useEffect(() => { const i = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(i); }, []); const minutes = Math.max(0, Math.floor((now - new Date(order.confirmedAt || order.createdAt)) / 60000)); return <div className="p-4 bg-white rounded-2xl border border-border-subtle"><div className="flex justify-between items-start mb-3"><div><h3 className="text-lg font-bold">#{order.orderNumber}</h3><p className="text-xs text-text-muted">{order.type === 'dine-in' ? `Table ${order.table}` : 'Takeaway'}</p></div><div className="flex items-center gap-1 text-xs text-text-secondary"><Timer size={14} /> {minutes}m</div></div><div className="space-y-2 mb-4">{order.items.map((i, idx) => <div key={idx} className="text-sm"><span className="font-semibold">{i.quantity}×</span> {i.snapshotName}<p className="text-xs text-text-muted pl-5">{i.customization && Object.values(i.customization).filter(Boolean).join(' · ')}</p></div>)}</div>{order.notes && <p className="text-xs bg-amber-50 text-amber-700 p-2 rounded-lg mb-3">Note: {order.notes}</p>}<div>{order.status === ORDER_STATES.CONFIRMED ? <Button fullWidth onClick={onStart}><Play size={15} /> Mulai Buat</Button> : <Button fullWidth onClick={onReady}><CheckCircle size={15} /> Tandai Siap</Button>}</div></div>; }
