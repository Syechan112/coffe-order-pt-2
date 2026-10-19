import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderHeader() {
  const navigate = useNavigate();

  return (
    <>
      {/* Back Navigation */}
      <button
        type="button"
        onClick={() => navigate('/cart')}
        className="mb-6 inline-flex items-center gap-2 py-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
      >
        <ArrowLeft size={16} />
        Back to Cart
      </button>

      {/* Page Heading */}
      <div className="mb-8">
        <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
          Almost there
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Complete your order
        </h1>

        <p className="mt-2 text-sm leading-6 text-stone-500">
          Review your items and choose your preferred payment method.
        </p>
      </div>
    </>
  );
}
