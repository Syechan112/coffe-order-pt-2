import { RefreshCw, Zap, Trash2, Settings } from 'lucide-react';
import useBrewStore from '../store/useBrewStore';
import { Button, Badge } from '../components/UI';

export default function DemoControl() {
  const { resetDemo, orders, createOrder } = useBrewStore();

  const simulateOrder = () => {
    const order = createOrder({
      type: 'takeaway',
      table: null,
      items: [{
        productId: 'prod-002',
        snapshotName: 'Cappuccino',
        priceAtPurchase: 35000,
        quantity: 2,
        customization: { temperature: 'Hot', sugarLevel: '50%', milk: 'Fresh Milk' },
      }],
      paymentMethod: 'qris',
      notes: 'Simulated order from Demo Center',
    });
    return order;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Settings size={24} className="text-accent" />
        <h1 className="text-2xl font-bold">Demo Control Center</h1>
      </div>

      <p className="text-text-secondary mb-6">
        Control the BrewFlow demo environment. Reset state or simulate scenarios for presentations.
      </p>

      <div className="space-y-4">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-border-subtle">
          <h2 className="font-semibold mb-2">Data Management</h2>
          <p className="text-sm text-text-secondary mb-4">
            Reset all orders and state back to the original seed data. This action cannot be undone.
          </p>
          <Button variant="danger" onClick={resetDemo}><Trash2 size={16} /> Reset Demo Data</Button>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-border-subtle">
          <h2 className="font-semibold mb-2">Scenario Runner</h2>
          <p className="text-sm text-text-secondary mb-4">Simulate a new order coming in instantly.</p>
          <Button onClick={simulateOrder}><Zap size={16} /> Simulate Fast Incoming Order</Button>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-border-subtle">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Current State</h2>
            <Button size="sm" variant="ghost"><RefreshCw size={14} /></Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <Stat label="All Orders" value={orders.length} />
            <Stat label="Pending" value={orders.filter((o) => o.status === 'pending_confirmation').length} variant="warning" />
            <Stat label="Preparing" value={orders.filter((o) => o.status === 'preparing').length} variant="primary" />
            <Stat label="Ready" value={orders.filter((o) => o.status === 'ready').length} variant="success" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, variant = 'neutral' }) {
  return (
    <div className="p-3 bg-surface rounded-xl">
      <Badge variant={variant}>{value}</Badge>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}
