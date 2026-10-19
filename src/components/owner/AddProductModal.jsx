import { useState } from 'react';
import { Plus } from 'lucide-react';
import useBrewStore from '../../store/useBrewStore';
import { Button, Modal } from '../UI';

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  image: '',
  available: true,
};

export default function AddProductModal({ isOpen, onClose }) {
  const { categories, addProduct } = useBrewStore();
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!form.name.trim()) return setError('Product name is required.');
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      return setError('Valid price is required.');
    if (!form.categoryId) return setError('Category is required.');

    addProduct({
      id: `prod-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      categoryId: form.categoryId,
      image: form.image.trim() ||
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      available: form.available,
      customization: null,
    });

    setForm(EMPTY_FORM);
    setError('');
    onClose();
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Product">
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1.5">
            Product Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Cold Brew Signature"
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Short product description..."
            rows={2}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-400 resize-none"
          />
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Price (Rp) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => set('price', e.target.value)}
              placeholder="35000"
              min="0"
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={form.categoryId}
              onChange={(e) => set('categoryId', e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-400"
            >
              <option value="">Select...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1.5">
            Image URL <span className="text-stone-400 font-normal">(optional)</span>
          </label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => set('image', e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-400"
          />
        </div>

        {/* Available */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => set('available', !form.available)}
            className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${
              form.available ? 'bg-stone-900' : 'bg-stone-200'
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                form.available ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
          <span className="text-sm text-stone-700">
            Available on menu
          </span>
        </div>

        {error && (
          <p className="text-xs text-rose-500">{error}</p>
        )}

        <div className="flex gap-2 pt-1">
          <Button variant="secondary" fullWidth onClick={handleClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleSubmit}>
            <Plus size={15} />
            Add Product
          </Button>
        </div>
      </div>
    </Modal>
  );
}
