import { useEffect, useState } from 'react';
import { QrCode, Plus, Download } from 'lucide-react';
import QRCode from 'qrcode';
import { Button, Modal } from '../UI';
import useBrewStore from '../../store/useBrewStore';

export default function TableManager({ tables }) {
  const { generateTables } = useBrewStore();
  const [qrModalTable, setQrModalTable] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [generateCount, setGenerateCount] = useState(5);
  const [generateZone, setGenerateZone] = useState('Indoor');

  useEffect(() => {
    if (qrModalTable) {
      const url = `${window.location.origin}/menu?table=${encodeURIComponent(qrModalTable.id)}`;
      QRCode.toDataURL(url, { width: 300, margin: 2 })
        .then(setQrDataUrl)
        .catch(() => setQrDataUrl(''));
    } else {
      setQrDataUrl('');
    }
  }, [qrModalTable]);

  const handleGenerate = () => {
    if (generateCount > 0) {
      generateTables(Number(generateCount), generateZone);
    }
  };

  const downloadQr = () => {
    if (!qrDataUrl || !qrModalTable) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `QR-Table-${qrModalTable.id}.png`;
    link.click();
  };

  return (
    <section className="mt-8 rounded-2xl border border-stone-200/80 bg-white p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">Table & QR Code Management</h2>
          <p className="text-xs text-stone-500 mt-1">
            Generate QR codes for tables. When scanned by customers, the table is automatically locked in URL.
          </p>
        </div>

        {/* Quick Batch Generator */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="50"
            value={generateCount}
            onChange={(e) => setGenerateCount(e.target.value)}
            className="w-16 rounded-lg border border-stone-200 px-2 py-1.5 text-xs text-stone-900 outline-none"
            placeholder="Count"
          />
          <select
            value={generateZone}
            onChange={(e) => setGenerateZone(e.target.value)}
            className="rounded-lg border border-stone-200 px-2 py-1.5 text-xs text-stone-900 outline-none"
          >
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="VIP Room">VIP Room</option>
          </select>
          <Button size="sm" onClick={handleGenerate}>
            <Plus size={14} />
            Generate Tables
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {tables.map((table) => (
          <div
            key={table.id}
            className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50/50"
          >
            <div>
              <p className="text-sm font-semibold text-stone-900">{table.name || table.id}</p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {table.zone || 'Indoor'} · {table.capacity || 4} Kursi
              </p>
            </div>
            <button
              type="button"
              onClick={() => setQrModalTable(table)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 transition hover:bg-stone-100"
              title="View & Download QR"
            >
              <QrCode size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* QR Preview Modal */}
      <Modal
        isOpen={Boolean(qrModalTable)}
        onClose={() => setQrModalTable(null)}
        title={`QR Code - ${qrModalTable?.name || qrModalTable?.id}`}
        maxWidth="max-w-sm"
      >
        {qrModalTable && (
          <div className="flex flex-col items-center text-center p-2">
            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm mb-4">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="w-56 h-56 mx-auto" />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-xs text-stone-400">
                  Generating QR...
                </div>
              )}
            </div>

            <p className="text-xs font-semibold text-stone-900 mb-1">
              Table {qrModalTable.id} ({qrModalTable.zone || 'Indoor'})
            </p>
            <p className="text-[11px] text-stone-500 mb-5 break-all max-w-xs">
              {`${window.location.origin}/menu?table=${encodeURIComponent(qrModalTable.id)}`}
            </p>

            <Button fullWidth onClick={downloadQr}>
              <Download size={15} />
              Download QR Image
            </Button>
          </div>
        )}
      </Modal>
    </section>
  );
}
