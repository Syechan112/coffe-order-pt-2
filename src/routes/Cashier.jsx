import { useState } from 'react';
import { Check, Eye, Clock } from 'lucide-react';
import useBrewStore from '../store/useBrewStore';
import { Badge, Button, Modal } from '../components/UI';
import { ORDER_STATES } from '../services/orderTransitions';

export default function Cashier() {
  const [tab, setTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders, confirmOrder, startPreparing, markReady, completeOrder, setNotification } = useBrewStore();

  const pending = orders.filter((order) => order.status === ORDER_STATES.PENDING_CONFIRMATION);
  const active = orders.filter((order) => [
    ORDER_STATES.CONFIRMED,
    ORDER_STATES.PREPARING,
    ORDER_STATES.READY,
  ].includes(order.status));
  const completed = orders.filter((order) => order.status === ORDER_STATES.COMPLETED);
  const displayOrders = { pending, active, completed }[tab] || [];

  const advanceOrder = (order) => {
    let result;
    let message;

    if (order.status === ORDER_STATES.PENDING_CONFIRMATION) {
      result = confirmOrder(order.id);
      message = `Pesanan #${order.orderNumber} dikonfirmasi.`;
    } else if (order.status === ORDER_STATES.CONFIRMED) {
      result = startPreparing(order.id);
      message = `Pesanan #${order.orderNumber} sedang diproses.`;
    } else if (order.status === ORDER_STATES.PREPARING) {
      result = markReady(order.id);
      message = `Pesanan #${order.orderNumber} siap diambil.`;
    } else if (order.status === ORDER_STATES.READY) {
      result = completeOrder(order.id);
      message = `Pesanan #${order.orderNumber} selesai.`;
    }

    if (result?.success) setNotification(message, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cashier Dashboard</h1>

      <div className="flex gap-2 mb-6 border-b border-border-subtle">
        {['pending', 'active', 'completed'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
              tab === t ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {t === 'pending' && `Pending (${pending.length})`}
            {t === 'active' && `Active (${active.length})`}
            {t === 'completed' && `Completed (${completed.length})`}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {displayOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onAdvance={() => advanceOrder(order)}
            onView={() => setSelectedOrder(order)}
            tab={tab}
          />
        ))}
      </div>

      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Order #${selectedOrder?.orderNumber}`} maxWidth="max-w-2xl">
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-muted uppercase mb-1">Type</p>
                <Badge variant="primary">{selectedOrder.type}</Badge>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase mb-1">Payment</p>
                <Badge>{selectedOrder.paymentMethod}</Badge>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="font-semibold mb-3">Items</p>
              <div className="space-y-2">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.quantity}× {item.snapshotName}</span>
                    <span className="font-medium">Rp {item.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>

            {tab === 'pending' && (
              <div className="space-y-2 flex gap-2">
                <Button fullWidth onClick={() => { advanceOrder(selectedOrder); setSelectedOrder(null); }}>Confirm Order</Button>
                <Button fullWidth variant="danger" onClick={() => { /* show reject reason form */ }}>Reject</Button>
              </div>
            )}

            {tab === 'active' && (
              <div className="space-y-2">
                <Button fullWidth onClick={() => { advanceOrder(selectedOrder); setSelectedOrder(null); }}>
                  {selectedOrder.status === ORDER_STATES.CONFIRMED
                    ? 'Start Preparing'
                    : selectedOrder.status === ORDER_STATES.PREPARING
                      ? 'Mark as Ready'
                      : 'Complete Order'}
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

function OrderCard({ order, onAdvance, onView, tab }) {
  const elapsedMins = order.confirmedAt ? Math.round((Date.now() - new Date(order.confirmedAt)) / 60000) : 0;
  return (
    <div className="p-4 bg-white rounded-2xl border border-border-subtle hover:shadow-subtle transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg">#{order.orderNumber}</h3>
          <p className="text-xs text-text-muted">{order.type === 'dine-in' ? `Table ${order.table}` : 'Takeaway'}</p>
        </div>
        <Badge variant={tab === 'pending' ? 'warning' : 'success'}>{order.status.replace('_', ' ')}</Badge>
      </div>
      <div className="text-sm text-text-secondary mb-3">{order.items.map((i) => i.snapshotName).join(', ')}</div>
      {order.status === ORDER_STATES.CONFIRMED && <div className="flex items-center gap-1 text-xs text-text-muted mb-3"><Clock size={14} /> {elapsedMins}m ago</div>}
      <div className="flex gap-2">
        {tab === 'pending' && (
          <>
            <Button size="sm" fullWidth onClick={onAdvance}><Check size={14} /> Confirm</Button>
            <Button size="sm" variant="ghost" fullWidth onClick={onView}><Eye size={14} /> View</Button>
          </>
        )}
        {tab === 'active' && (
          <>
            <Button size="sm" variant="primary" fullWidth onClick={onAdvance}>
              Advance
            </Button>
            <Button size="sm" variant="ghost" fullWidth onClick={onView}><Eye size={14} /> View</Button>
          </>
        )}
      </div>
    </div>
  );
}
