import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useBrewStore from './store/useBrewStore';
import { subscribeToStorage } from './services/demoStorageService';
import Layout from './components/Layout';
import Menu from './routes/Menu';
import OrderFlow from './routes/OrderFlow';
import Cart from './routes/Cart';
import Tracker from './routes/Tracker';
import Cashier from './routes/Cashier';
import BaristaDashboard from './routes/BaristaDashboard';
import PickupDisplay from './routes/PickupDisplay';
import OwnerDashboard from './routes/OwnerDashboard';
import DemoControl from './routes/DemoControl';

export default function App() {
  const { loadFromStorage, syncFromExternal } = useBrewStore();

  useEffect(() => {
    loadFromStorage();

    const unsubscribe = subscribeToStorage((next) => {
      syncFromExternal(next);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<OrderFlow />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/tracker/:orderId" element={<Tracker />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/barista" element={<BaristaDashboard />} />
        <Route path="/display" element={<PickupDisplay />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/demo" element={<DemoControl />} />
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
    </Layout>
  );
}
