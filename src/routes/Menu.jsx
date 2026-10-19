
import { useEffect, useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import useBrewStore from '../store/useBrewStore';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import CategoryMobileModal from '../components/CategoryMobileModal';
import MenuFloatingCart from '../components/MenuFloatingCart';
import TableSelectModal from '../components/TableSelectModal';

export default function Menu() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const tableParam = searchParams.get('table');

  const { categories, products, setCartTable } = useBrewStore();

  // Block back navigation while table not chosen yet (only when no QR param)
  useEffect(() => {
    if (tableParam) return; // QR-scanned: table locked, back allowed
    if (window.sessionStorage.getItem('brewflow_table_selected')) return;

    // Push marker entry so first back pops here instead of /cart
    window.history.pushState({ tableLock: true }, '', window.location.href);

    const handlePopState = (event) => {
      if (event.state?.tableLock) {
        window.history.pushState(null, '', window.location.href);
        setTableModalOpen(true);
        return;
      }
      // Block leaving /menu
      event.preventDefault();
      event.returnValue = '';
      setTableModalOpen(true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [tableParam]);

  // Auto-lock scanned table to cart when arriving via QR
  useEffect(() => {
    if (tableParam) setCartTable(tableParam);
  }, [tableParam, setCartTable]);

  // Open table selector on first visit (no QR param, not chosen yet this session)
  useEffect(() => {
    if (
      !tableParam &&
      !window.sessionStorage.getItem('brewflow_table_selected')
    ) {
      setTableModalOpen(true);
    }
  }, [tableParam]);

  const handleTableSelect = (tableId) => {
    window.sessionStorage.setItem('brewflow_table_selected', 'true');
    setCartTable(tableId);
    setTableModalOpen(false);
  };

  const filtered = products.filter((product) => {
    const matchCat =
      activeCategory === 'all' ||
      product.categoryId === activeCategory;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    return matchCat && matchSearch && product.available;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
      <section className="mb-6 sm:mb-8">
        <div className="relative mb-5">
          <Search
            size={18}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search menu..."
            aria-label="Search menu"
            className="h-11 w-full rounded-xl border border-stone-200 bg-white pl-11 pr-11 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-stone-400 sm:h-12"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="no-scrollbar hidden gap-2 overflow-x-auto pb-1 sm:flex">
          {[{ id: 'all', name: 'All' }, ...categories].map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors sm:text-sm ${isActive
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400 hover:text-stone-900'
                  }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end sm:hidden">
          <button
            type="button"
            onClick={() => setCategoryModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:border-stone-400"
          >
            <SlidersHorizontal size={16} />
            {categories.find((c) => c.id === activeCategory)?.name || 'Category'}
          </button>
        </div>
      </section>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-56 flex-col items-center justify-center text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white">
            <Search size={19} className="text-stone-400" />
          </div>

          <p className="text-sm font-medium text-stone-800">
            No products found
          </p>

          <p className="mt-1 text-xs text-stone-500">
            Try another search or category.
          </p>

          {(search || activeCategory !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="mt-4 text-xs font-medium text-stone-800 underline underline-offset-4 hover:text-stone-500"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <CategoryMobileModal
        categories={categories}
        activeCategory={activeCategory}
        onSelect={(catId) => setActiveCategory(catId)}
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />

      <MenuFloatingCart />
      <TableSelectModal
        isOpen={tableModalOpen}
        onSelect={handleTableSelect}
      />
    </div>
  );
}