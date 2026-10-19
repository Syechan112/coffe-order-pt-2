import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Check,
  Coffee,
  Package,
  CheckCircle2,
  ChevronRight,
  Clock,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';
import useBrewStore from '../store/useBrewStore';
import { Badge, Modal } from '../components/UI';
import { ORDER_STATES } from '../services/orderTransitions';

export default function Tracker() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, lastOrderId, clearTrackedOrder } = useBrewStore();
  const [confirmReset, setConfirmReset] = useState(false);

  const recentOrder = orderId
    ? orders.find((order) => order.id === orderId) || null
    : orders.find((order) => order.id === lastOrderId) || null;

  const resetTracker = () => {
    clearTrackedOrder();
    setConfirmReset(false);
    navigate('/tracker', { replace: true });
  };

  if (!recentOrder) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-500">
          <Coffee size={24} strokeWidth={1.6} />
        </div>

        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
          {orderId ? 'Order not found' : 'No recent order'}
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">
          {orderId
            ? `Could not find order with ID: ${orderId}`
            : 'Place an order first to see its status.'}
        </p>

        <Link
          to="/menu"
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-medium text-white transition-colors hover:bg-stone-800"
        >
          <ArrowLeft size={16} />
          Back to Menu
        </Link>
      </div>
    );
  }

  const steps = [
    { status: 'pending_confirmation', label: 'Diterima', icon: CheckCircle2 },
    { status: 'confirmed', label: 'Dikonfirmasi', icon: Check },
    { status: 'preparing', label: 'Diproses', icon: Coffee },
    { status: 'ready', label: 'Siap Diambil', icon: Package },
    { status: 'completed', label: 'Selesai', icon: CheckCircle2 },
  ];

  const currentIdx = steps.findIndex(
    (step) => step.status === recentOrder.status
  );

  const elapsedMins = recentOrder.confirmedAt
    ? Math.max(
        0,
        Math.round(
          (Date.now() - new Date(recentOrder.confirmedAt).getTime()) / 60000
        )
      )
    : 0;

  const isRejected = recentOrder.status === 'rejected';
  const isCompleted = recentOrder.status === ORDER_STATES.COMPLETED;

  const statusLabel = {
    pending_confirmation: 'Menunggu Konfirmasi',
    confirmed: 'Dikonfirmasi',
    preparing: 'Sedang Diproses',
    ready: 'Siap Diambil',
    completed: 'Selesai',
    rejected: 'Ditolak',
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:pt-10">
      <div className="mb-6">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-stone-900"
        >
          <ArrowLeft size={16} />
          Back to Menu
        </Link>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Track your order
        </h1>

        <p className="mt-1.5 text-sm text-stone-500">
          Follow your order from confirmation to pickup.
        </p>
      </div>

      <div className="mb-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <div className="flex items-start justify-between gap-4 border-b border-stone-100 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
              Order number
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
              #{recentOrder.orderNumber}
            </h2>
          </div>

          <Badge variant={isRejected ? 'danger' : isCompleted ? 'success' : 'neutral'}>
            {statusLabel[recentOrder.status] || recentOrder.status.replaceAll('_', ' ')}
          </Badge>
        </div>

        <div className="p-5 sm:p-6">
          {isRejected ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
              <p className="text-sm font-medium text-rose-800">
                Pesanan belum dapat diproses.
              </p>
              <p className="mt-1 text-sm leading-6 text-rose-700">
                {recentOrder.rejectionReason || 'Silakan hubungi kasir untuk informasi lebih lanjut.'}
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-7 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-900">
                  Order progress
                </h3>

                <span className="text-xs text-stone-400">
                  {currentIdx >= 0
                    ? `${currentIdx + 1} of ${steps.length} steps`
                    : 'In progress'}
                </span>
              </div>

              <div className="space-y-0">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isPast =
                    currentIdx >= 0 &&
                    (idx < currentIdx || recentOrder.status === 'completed');
                  const isCurrent = idx === currentIdx;
                  const isLast = idx === steps.length - 1;

                  return (
                    <div key={step.status} className="flex gap-4">
                      <div className="flex w-10 shrink-0 flex-col items-center">
                        <div
                          className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                            isPast
                              ? 'border-stone-900 bg-stone-900 text-white'
                              : isCurrent
                                ? 'border-stone-900 bg-white text-stone-900 ring-4 ring-stone-100'
                                : 'border-stone-200 bg-white text-stone-400'
                          }`}
                        >
                          <Icon size={18} strokeWidth={1.8} />
                        </div>

                        {!isLast && (
                          <div
                            className={`my-1 min-h-8 w-px flex-1 ${
                              isPast ? 'bg-stone-900' : 'bg-stone-200'
                            }`}
                          />
                        )}
                      </div>

                      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-7'} pt-1`}>
                        <p
                          className={`text-sm font-medium ${
                            isPast || isCurrent
                              ? 'text-stone-900'
                              : 'text-stone-400'
                          }`}
                        >
                          {step.label}
                        </p>

                        <p className="mt-1 text-xs text-stone-500">
                          {isPast
                            ? 'Selesai'
                            : isCurrent
                              ? 'Sedang berlangsung'
                              : 'Menunggu'}
                        </p>
                      </div>

                      {isCurrent && (
                        <div className="pt-1">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-stone-900" />
                            Current
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {recentOrder.status === ORDER_STATES.CONFIRMED && (
                <div className="mt-5 flex items-center gap-2 border-t border-stone-100 pt-4 text-xs text-stone-500">
                  <Clock size={15} />
                  Dikonfirmasi {elapsedMins} menit lalu
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-stone-200 bg-stone-50/60 p-5 sm:p-6">
          <h3 className="mb-4 text-sm font-semibold text-stone-900">
            Order details
          </h3>

          <div className="space-y-3">
            {recentOrder.items.map((item, index) => (
              <div
                key={`${item.snapshotName}-${index}`}
                className="flex items-start justify-between gap-4 text-sm"
              >
                <span className="min-w-0 text-stone-600">
                  <span className="mr-2 text-stone-400">
                    {item.quantity}×
                  </span>
                  {item.snapshotName}
                </span>

                <span className="shrink-0 font-medium tabular-nums text-stone-800">
                  Rp {item.subtotal.toLocaleString('id-ID')}
                </span>
              </div>
            ))}

            <div className="flex items-center justify-between gap-4 border-t border-dashed border-stone-200 pt-4">
              <span className="text-sm font-semibold text-stone-900">
                Total
              </span>

              <span className="text-base font-semibold tabular-nums text-stone-900">
                Rp {recentOrder.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/menu"
        className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-900"
      >
        Order something else
        <ChevronRight size={16} />
      </Link>

      {isCompleted && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-stone-900 px-5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
          >
            <RotateCcw size={15} />
            Reset Session
          </button>

          <p className="text-xs text-stone-400">
            You can start a new order anytime.
          </p>
        </div>
      )}

      <Modal
        isOpen={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset tracking?"
      >
        <p className="text-sm leading-6 text-stone-600">
          Order sudah selesai. Reset tracker sekarang? Anda tidak akan melihat
          status pesanan ini lagi.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setConfirmReset(false)}
            className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={resetTracker}
            className="flex-1 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
          >
            Reset
          </button>
        </div>
      </Modal>
    </div>
  );
}