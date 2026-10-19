import { Button, Modal } from '../UI';

export default function QrisPaymentModal({ isOpen, onClose, onConfirm, total }) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bayar via QRIS"
      maxWidth="max-w-sm"
    >
      <div className="flex flex-col items-center px-1 py-2 text-center">
        <p className="mb-5 max-w-xs text-sm leading-6 text-stone-500">
          Scan kode QR berikut untuk menyelesaikan transaksi.
        </p>

        <div className="flex h-56 w-full max-w-56 flex-col items-center justify-center rounded-xl border border-stone-200 bg-stone-50 p-4">
          <div className="flex h-36 w-36 items-center justify-center rounded-lg border border-dashed border-stone-300 bg-white text-sm font-semibold text-stone-400">
            QRIS Dummy
          </div>

          <span className="mt-3 text-[10px] tracking-wide text-stone-400">
            NMID: ID1029384756
          </span>
        </div>

        <div className="my-5 w-full rounded-xl bg-stone-50 px-4 py-3">
          <p className="text-xs text-stone-500">Total pembayaran</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-stone-900">
            Rp {total.toLocaleString('id-ID')}
          </p>
        </div>

        <Button fullWidth onClick={onConfirm}>
          Saya Sudah Bayar
        </Button>

        <p className="mt-3 text-xs leading-5 text-stone-400">
          Simulasi pembayaran untuk keperluan demo.
        </p>
      </div>
    </Modal>
  );
}
