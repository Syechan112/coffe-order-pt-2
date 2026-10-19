import { ShoppingBag } from 'lucide-react';

export default function OrderSummary({ cart }) {
  return (
    <section className="mb-6 overflow-hidden rounded-xl border border-stone-200/80 bg-white">
      <div className="flex items-center gap-2.5 border-b border-stone-100 px-4 py-4 sm:px-5">
        <ShoppingBag size={17} className="text-stone-500" />

        <h2 className="text-sm font-semibold text-stone-900">
          Order Summary
        </h2>

        <span className="ml-auto text-xs text-stone-500">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} items
        </span>
      </div>

      <div className="px-4 sm:px-5">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 border-b border-stone-100 py-4 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="break-words text-sm font-medium text-stone-900">
                {item.snapshotName}
              </p>

              <p className="mt-1 text-xs text-stone-500">
                Qty {item.quantity}
              </p>

              {item.customization && (
                <p className="mt-1 text-xs leading-5 text-stone-400">
                  {Object.values(item.customization)
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
            </div>

            <p className="shrink-0 text-sm font-medium tabular-nums text-stone-800">
              Rp {item.subtotal.toLocaleString('id-ID')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
