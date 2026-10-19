import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useBrewStore from '../store/useBrewStore';
import { downloadReceipt } from '../hooks/useReceiptDownload';
import OrderHeader from '../components/order-flow/OrderHeader';
import OrderSummary from '../components/order-flow/OrderSummary';
import OrderTableInfo from '../components/order-flow/OrderTableInfo';
import OrderPaymentMethod from '../components/order-flow/OrderPaymentMethod';
import OrderBottomBar from '../components/order-flow/OrderBottomBar';
import QrisPaymentModal from '../components/order-flow/QrisPaymentModal';
import ReceiptModal from '../components/order-flow/ReceiptModal';

export default function OrderFlow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableParam = searchParams.get('table');
  const { tables, cart, createOrder, clearCart, selectedTableId, setCartTable } = useBrewStore();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showQrisPayment, setShowQrisPayment] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

  const activeTable = tableParam || selectedTableId || tables[0]?.id || null;

  useEffect(() => {
    if (cart.length === 0 && !receiptOrder) navigate('/menu');
  }, [cart, receiptOrder, navigate]);

  const completeOrder = () => {
    const order = createOrder({
      type: 'dine-in',
      table: activeTable,
      items: cart,
      paymentMethod,
      notes: '',
    });

    setShowQrisPayment(false);
    setReceiptOrder(order);
    clearCart();
  };

  const handleCheckout = () => {
    if (paymentMethod === 'qris') setShowQrisPayment(true);
    else completeOrder();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-52 pt-6 sm:px-6 sm:pb-48 sm:pt-10">
      <OrderHeader />
      <OrderSummary cart={cart} />
      <OrderTableInfo
        tableParam={tableParam}
        tables={tables}
        selectedTable={activeTable}
        onSelectTable={(id) => setCartTable(id)}
      />
      <OrderPaymentMethod
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <OrderBottomBar
        total={total}
        paymentMethod={paymentMethod}
        onCheckout={handleCheckout}
      />
      <QrisPaymentModal
        isOpen={showQrisPayment}
        onClose={() => setShowQrisPayment(false)}
        onConfirm={completeOrder}
        total={total}
      />
      <ReceiptModal
        order={receiptOrder}
        onClose={() => navigate(`/tracker/${receiptOrder.id}`)}
        onDownload={() => downloadReceipt(receiptOrder)}
      />
    </div>
  );
}
