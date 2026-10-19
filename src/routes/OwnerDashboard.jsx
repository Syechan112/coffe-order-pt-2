import { useEffect, useState } from 'react';
import { ShoppingCart, TrendingUp, Calendar, Plus } from 'lucide-react';
import useBrewStore from '../store/useBrewStore';
import { calculateAnalytics } from '../services/demoAnalyticsService';
import StatCard from '../components/owner/StatCard';
import ChartCard from '../components/owner/ChartCard';
import PieCard from '../components/owner/PieCard';
import ProductTable from '../components/owner/ProductTable';
import AddProductModal from '../components/owner/AddProductModal';
import TableManager from '../components/owner/TableManager';

const EMPTY_ANALYTICS = {
  totalRevenue: 0,
  totalOrders: 0,
  aov: 0,
  topProducts: [],
  paymentMethodDistribution: {},
  revenueByType: {},
  hourlyData: [],
};

export default function OwnerDashboard() {
  const { orders, products, tables, resetDemo } = useBrewStore();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(() => {
    try {
      const saved = localStorage.getItem('brewflow_analytics');
      return saved ? JSON.parse(saved) : EMPTY_ANALYTICS;
    } catch {
      return EMPTY_ANALYTICS;
    }
  });

  useEffect(() => {
    const nextAnalytics = calculateAnalytics(orders);
    setAnalytics(nextAnalytics);
    localStorage.setItem('brewflow_analytics', JSON.stringify(nextAnalytics));
  }, [orders]);

  const pendingCount = orders.filter((o) => o.status === 'pending_confirmation').length;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <span className="text-xs font-medium text-stone-500">{products.length} products</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400"
          >
            <Plus size={16} strokeWidth={1.8} />
            Add Product
          </button>
          <button
            onClick={resetDemo}
            className="px-3 py-1.5 text-xs bg-rose-500/10 text-rose-600 rounded-lg border border-rose-500/20"
          >
            Reset Demo Data
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Revenue" value={`Rp ${analytics.totalRevenue.toLocaleString('id-ID')}`} icon={TrendingUp} color="emerald" />
        <StatCard label="Orders Completed" value={analytics.totalOrders} icon={ShoppingCart} color="blue" />
        <StatCard label="Avg Order Value" value={`Rp ${analytics.aov.toLocaleString('id-ID')}`} icon={TrendingUp} color="amber" />
        <StatCard label="Pending" value={pendingCount} icon={Calendar} color="rose" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue by Hour" data={analytics.hourlyData} />
        <ChartCard title="Top Selling Products" data={analytics.topProducts} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <PieCard title="Payment Methods" data={analytics.paymentMethodDistribution} />
        <PieCard title="Revenue by Type" data={analytics.revenueByType} />
      </div>

      <ProductTable products={products} />

      <TableManager tables={tables} />

      <AddProductModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </div>
  );
}
