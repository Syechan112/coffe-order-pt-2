import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import useBrewStore from '../../store/useBrewStore';
import { Modal, Button } from '../UI';

export default function ProductTable({ products }) {
  const { deleteProduct } = useBrewStore();
  const [pendingDelete, setPendingDelete] = useState(null);

  const confirmDelete = () => {
    if (pendingDelete) {
      deleteProduct(pendingDelete.id);
      setPendingDelete(null);
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-stone-900 mb-4">Products</h2>
      <div className="overflow-x-auto rounded-xl border border-stone-200/80 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-4 py-2.5 text-xs font-medium uppercase text-stone-500">Product</th>
              <th className="px-4 py-2.5 text-xs font-medium uppercase text-stone-500">Category</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium uppercase text-stone-500">Price</th>
              <th className="px-4 py-2.5 text-center text-xs font-medium uppercase text-stone-500">Status</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium uppercase text-stone-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <img src={product.image} alt={product.name} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                    <span className="block min-w-0 font-medium text-stone-800">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-stone-600">{product.categoryId}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">Rp {product.price.toLocaleString('id-ID')}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className={`inline-block h-2 w-2 rounded-full ${product.available ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => setPendingDelete(product)}
                    aria-label={`Delete ${product.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-stone-500">
                  No products yet. Click Add Product to begin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title="Hapus Produk?"
        maxWidth="max-w-sm"
      >
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Trash2 size={24} className="text-rose-500" />
          </div>
          <p className="text-sm text-stone-700">
            Yakin hapus{' '}
            <span className="font-semibold">
              {pendingDelete?.name || pendingDelete?.id}
            </span>
            ? Produk tidak bisa dikembalikan.
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Button variant="secondary" onClick={() => setPendingDelete(null)}>
            Batal
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Hapus Produk
          </Button>
        </div>
      </Modal>
    </section>
  );
}
