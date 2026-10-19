import { useEffect, useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import useBrewStore from '../store/useBrewStore';
import { Button } from './UI';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateCartItem, removeCartItem, clearCart, createOrder, tables } = useBrewStore();
  const [orderType, setOrderType] = useState('dine-in');
  const [selectedTable, setSelectedTable] = useState(tables[0]?.id || '');
  const [notes, setNotes] = useState('');
  const [checkoutError, setCheckoutError] = useState(null);

  // Reset form on open/close
  useEffect(() => {
    if (isOpen) {
      setOrderType('dine-in');
      setSelectedTable(tables[0]?.id || '');
      setNotes('');
      setCheckoutError(null);
    }
  }, [isOpen, tables]);

  if (!isOpen) return null;

  const total = cart.reduce((sum, i) => sum + i.subtotal, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      setCheckoutError('Cart is empty');
      return;
    }
    if (orderType === 'dine-in' && !selectedTable) {
      setCheckoutError('Please select a table');
      return;
    }

    createOrder({
      type: orderType,
      table: orderType === 'dine-in' ? selectedTable : null,
      items: cart,
      paymentMethod: 'cash',
      notes,
    });
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col h-full animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <h2 className="font-semibold text-lg">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-text-muted">
              <ShoppingCart size={48} className="mb-4 opacity-20" />
              <p>Your cart is empty</p>
              <p className="text-sm mt-1">Start adding delicious items</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl bg-surface overflow-hidden flex-shrink-0">
                      {/* Placeholder for product image */}
                      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-2xl">
                        ☕
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{item.snapshotName}</h4>
                      <p className="text-sm text-text-secondary mt-0.5">
                        {item.customization ? Object.values(item.customization).filter(Boolean).join(' • ') : 'Standard'}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 rounded-lg border border-border-subtle hover:bg-surface flex items-center justify-center text-text-primary"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg border border-border-subtle hover:bg-surface flex items-center justify-center text-text-primary"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-semibold text-espresso">Rp {item.subtotal.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="self-start p-2 text-text-muted hover:text-rose-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border-subtle space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Order Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOrderType('dine-in')}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        orderType === 'dine-in'
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border-subtle hover:bg-surface text-text-secondary'
                      }`}
                    >
                      Dine-in
                    </button>
                    <button
                      onClick={() => setOrderType('takeaway')}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        orderType === 'takeaway'
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border-subtle hover:bg-surface text-text-secondary'
                      }`}
                    >
                      Takeaway
                    </button>
                  </div>
                </div>

                {orderType === 'dine-in' && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Select Table</label>
                    <select
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-white dark:bg-gray-900 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
                    >
                      {tables.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.zone})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Special Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Allergies, preferences, etc."
                    className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-white dark:bg-gray-900 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none h-20"
                  />
                </div>
              </div>

              {checkoutError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 text-sm">
                  {checkoutError}
                </div>
              )}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border-subtle space-y-4 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between text-text-secondary text-sm">
              <span>Subtotal</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex items-center justify-between text-xl font-bold text-espresso">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <Button fullWidth onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

CartDrawer.displayName = 'CartDrawer';