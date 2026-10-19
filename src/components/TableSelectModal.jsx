import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Modal, Button } from './UI';
import useBrewStore from '../store/useBrewStore';

export default function TableSelectModal({ isOpen, onSelect }) {
  const { tables, selectedTableId, setCartTable } = useBrewStore();
  const [selected, setSelected] = useState(selectedTableId || tables[0]?.id || '');

  useEffect(() => {
    if (isOpen) setSelected(selectedTableId || tables[0]?.id || '');
  }, [isOpen, selectedTableId, tables]);

  const confirm = () => {
    if (!selected) return;
    setCartTable(selected);
    onSelect(selected);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Pilih Meja">
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-xl bg-stone-50 p-3">
          <MapPin size={18} className="mt-0.5 shrink-0 text-stone-700" />
          <p className="text-sm leading-5 text-stone-600">
            Pilih meja untuk pesanan dine-in. Jika masuk lewat QR meja, pilihan ini akan otomatis terkunci.
          </p>
        </div>

        <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
          {tables.map((table) => (
            <button
              key={table.id}
              type="button"
              onClick={() => setSelected(table.id)}
              className={`rounded-xl border p-3 text-left transition ${
                selected === table.id
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
              }`}
            >
              <p className="text-sm font-semibold">{table.name || table.id}</p>
              <p className={`mt-1 text-xs ${selected === table.id ? 'text-stone-300' : 'text-stone-400'}`}>
                {table.zone || 'Indoor'} · {table.capacity || 4} seats
              </p>
            </button>
          ))}
        </div>

        <Button fullWidth disabled={!selected} onClick={confirm}>
          Continue to Menu
        </Button>
      </div>
    </Modal>
  );
}
