import { Button } from '../UI';

export default function OrderBottomBar({ total, paymentMethod, onCheckout }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-md sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-stone-500">Total payment</p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              Rp {total.toLocaleString('id-ID')}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-stone-500">Payment method</p>
            <p className="mt-1 text-sm font-medium text-stone-800">
              {paymentMethod === 'cash'
                ? 'Cash'
                : paymentMethod === 'qris'
                  ? 'QRIS'
                  : 'E-Wallet'}
            </p>
          </div>
        </div>

        <Button fullWidth size="lg" onClick={onCheckout}>
          Place Order
        </Button>
      </div>
    </div>
  );
}
