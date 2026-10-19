import { useRef } from 'react';
import { Download } from 'lucide-react';
import { Button, Modal } from '../UI';
import receiptEl from './receiptTemplate.jsx';

export default function ReceiptModal({ order, onClose, onDownload }) {
  const ref = useRef(null);

  if (!order) return null;

  return (
    <Modal
      isOpen={!!order}
      onClose={onClose}
      title="Order Receipt"
      maxWidth="max-w-sm"
    >
      <div className="overflow-x-auto rounded-lg border border-stone-100 bg-stone-50">
        <div ref={ref} className="mx-auto w-fit">
          {receiptEl(order)}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Button fullWidth variant="secondary" onClick={onClose}>
          View Order
        </Button>

        <Button fullWidth onClick={onDownload}>
          <Download size={15} />
          Download
        </Button>
      </div>
    </Modal>
  );
}
