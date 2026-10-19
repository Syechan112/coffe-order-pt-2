import { useState } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';

export default function OrderTableInfo({
  tableParam,
  tables = [],
  selectedTable,
  onSelectTable,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeTableId = selectedTable || tableParam || tables[0]?.id;
  const currentTable = tables.find((t) => t.id === activeTableId) || {
    id: activeTableId,
    name: `Meja ${activeTableId}`,
    zone: 'Indoor',
  };

  return (
    <section className="mb-8 rounded-xl border border-stone-200/80 bg-white p-4 sm:p-5 relative">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100">
            <MapPin size={18} className="text-stone-700" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-stone-900">
              Dine-in table
            </h2>

            <p className="mt-1 text-sm text-stone-700 font-medium">
              {currentTable.name || `Table ${currentTable.id}`}
              <span className="ml-2 text-xs text-stone-400 font-normal">
                ({currentTable.zone || 'Indoor'})
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {tableParam ? (
            <span className="shrink-0 rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-stone-600">
              QR Scanned (Locked)
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100"
            >
              <span>Ubah Meja</span>
              <ChevronDown size={14} className={dropdownOpen ? 'rotate-180 transition' : 'transition'} />
            </button>
          )}
        </div>
      </div>

      {!tableParam && dropdownOpen && (
        <div className="mt-4 border-t border-stone-100 pt-3">
          <p className="text-xs text-stone-500 mb-2">Pilih nomor meja yang tersedia:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            {tables.map((t) => {
              const isSelected = t.id === activeTableId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    if (onSelectTable) onSelectTable(t.id);
                    setDropdownOpen(false);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition ${
                    isSelected
                      ? 'border-stone-900 bg-stone-900 text-white font-medium'
                      : 'border-stone-200 hover:border-stone-400 bg-white text-stone-700'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate">{t.name || t.id}</p>
                    <p className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                      {t.zone}
                    </p>
                  </div>
                  {isSelected && <Check size={14} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
