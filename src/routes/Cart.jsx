import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import useBrewStore from '../store/useBrewStore';
import { Button } from '../components/UI';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeCartItem, clearCart } = useBrewStore();

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

  const formatPrice = (price) =>
    `Rp ${price.toLocaleString('id-ID')}`;

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-4xl flex-col items-center justify-center px-5 py-16 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-stone-200 bg-white">
          <ShoppingCart size={32} strokeWidth={1.5} className="text-stone-400" />
        </div>

        <h1 className="text-xl font-semibold tracking-tight text-stone-900">
          Your cart is empty
        </h1>

        <p className="mt-2 max-w-xs text-sm leading-6 text-stone-500">
          Looks like you haven&apos;t added anything to your order yet.
        </p>

        <Button
          size="lg"
          onClick={() => navigate('/menu')}
          className="mt-6"
        >
          Explore Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-64 pt-6 sm:px-6 sm:pb-52 sm:pt-10">


      <div className="mb-7">
        <button
          type="button"
          onClick={() => navigate('/menu')}
          className="mb-5 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
        >
          <ArrowLeft size={16} />
          Back to Menu
        </button>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
              Your selection
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              Your Cart
            </h1>

            <p className="mt-1.5 text-sm text-stone-500">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your order
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="mb-1 inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-rose-600"
          >
            <Trash2 size={14} />
            Clear cart
          </button>
        </div>
      </div>


      <div className="space-y-3">
        {cart.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-stone-200/80 bg-white p-3.5 sm:p-5"
          >
            <div className="flex items-start gap-3 sm:gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-stone-100 sm:h-20 sm:w-20">
                <ShoppingCart
                  size={21}
                  strokeWidth={1.4}
                  className="text-stone-300"
                />
              </div>


              <div className="min-w-0 flex-1 pt-0.5">
                <h2 className="break-words text-sm font-semibold leading-5 text-stone-900 sm:text-base">
                  {item.snapshotName}
                </h2>

                {item.customization && (
                  <p className="mt-1.5 text-xs leading-5 text-stone-500">
                    {Object.values(item.customization)
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}

                <p className="mt-2 text-sm font-medium text-stone-700">
                  {formatPrice(item.subtotal)}
                </p>
              </div>


              <button
                type="button"
                onClick={() => removeCartItem(item.id)}
                aria-label={`Remove ${item.snapshotName}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 size={16} strokeWidth={1.7} />
              </button>
            </div>


            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3.5">
              <span className="text-xs text-stone-500">Quantity</span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updateCartItem(item.id, Math.max(1, item.quantity - 1))
                  }
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-600 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={13} />
                </button>

                <span className="w-5 text-center text-sm font-semibold tabular-nums text-stone-900">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateCartItem(item.id, item.quantity + 1)
                  }
                  aria-label="Increase quantity"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-600 transition-colors hover:bg-stone-100"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>


      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-md sm:px-6 sm:pt-5">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-stone-500">Total payment</p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                {formatPrice(total)}
              </p>
            </div>

            <p className="text-right text-xs leading-5 text-stone-500">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              <br />
              in your order
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={clearCart}
              className="shrink-0"
            >
              Clear
            </Button>

            <button
              type="button"
              onClick={() => navigate('/order')}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 text-sm font-medium text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
            >
              Proceed to Order
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}