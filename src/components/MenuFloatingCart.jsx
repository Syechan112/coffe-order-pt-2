import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useBrewStore from '../store/useBrewStore';

export default function MenuFloatingCart() {
  const navigate = useNavigate();
  const { cart } = useBrewStore();

  const total = cart.reduce((sum, i) => sum + i.subtotal, 0);
  const items = cart.length;

  if (items === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-3 z-40 px-3 pb-[env(safe-area-inset-bottom)] sm:bottom-5 sm:px-5">
      <div className="mx-auto flex max-w-3xl items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-lg shadow-stone-900/[0.08]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
            <ShoppingCart size={18} strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-stone-500">{items} item{items > 1 ? 's' : ''}</p>
            <p className="text-lg font-semibold text-stone-900 tabular-nums">
              Rp {total.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/cart')}
          className="shrink-0 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-800 active:bg-stone-950"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}
