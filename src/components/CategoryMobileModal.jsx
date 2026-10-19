
import { Check, LayoutGrid } from 'lucide-react';
import { Modal } from './UI';

export default function CategoryMobileModal({
  categories,
  activeCategory,
  onSelect,
  isOpen,
  onClose,
}) {
  const items = [{ id: 'all', name: 'All' }, ...categories];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Category"
    >
      <div className="space-y-5">
        <div>
          <p className="text-sm text-stone-500">
            Browse drinks by category.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {items.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  onSelect(category.id);
                  onClose();
                }}
                className={`group flex min-h-[56px] items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-left transition-colors duration-150 ${
                  isActive
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  {category.id === 'all' && (
                    <LayoutGrid
                      size={16}
                      strokeWidth={1.8}
                      className={
                        isActive ? 'text-white' : 'text-stone-400'
                      }
                    />
                  )}

                  <span className="truncate text-sm font-medium">
                    {category.name}
                  </span>
                </span>

                {isActive && (
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="shrink-0"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="border-t border-stone-100 pt-4">
          <p className="text-xs text-stone-400">
            {items.length} categories available
          </p>
        </div>
      </div>
    </Modal>
  );
}