import { useState } from 'react';
import {
  Plus,
  Check,
  Thermometer,
  Droplets,
  Milk,
} from 'lucide-react';
import { Button, Modal } from './UI';
import useBrewStore from '../store/useBrewStore';

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);

  const [custom, setCustom] = useState({
    temperature: product.customization?.temperature?.[0],
    sugarLevel:
      product.customization?.sugarLevel?.[2] ||
      product.customization?.sugarLevel?.[0],
    milk: product.customization?.milk?.[0],
  });

  const { addToCart, setNotification } = useBrewStore();

  const updateCustom = (key, value) => {
    setCustom((prev) => ({ ...prev, [key]: value }));
  };

  const addOnPrice = computeAddOnPrice(product, custom);

  const finalPrice = product.price + addOnPrice;

  const add = () => {
    addToCart(product, product.customization ? custom : null, 1, addOnPrice);
    setNotification(`${product.name} ditambahkan ke cart`, 'success');
    setOpen(false);
  };

  return (
    <>
      <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white transition-colors duration-200 hover:border-stone-300">
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />

          <span className="absolute bottom-2 left-2 rounded-md bg-black/35 px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-white sm:bottom-3 sm:left-3 sm:text-[10px]">
            Crafted with care
          </span>
        </div>

        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <div className="flex flex-1 flex-col">
            <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 tracking-tight text-stone-900 sm:text-[15px]">
              {product.name}
            </h3>

            <p className="mt-1.5 line-clamp-2 min-h-9 text-[11px] leading-[18px] text-stone-500 sm:text-xs">
              {product.description}
            </p>

            <p className="mt-3 text-sm font-semibold tabular-nums text-stone-900 sm:text-[15px]">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
          </div>

          <div className="mt-4 border-t border-stone-100 pt-3">
            <button
              type="button"
              onClick={() =>
                product.customization ? setOpen(true) : add()
              }
              className="flex h-10 w-full items-center justify-between gap-1.5 rounded-lg bg-stone-900 px-3 text-left text-[11px] font-medium text-white transition-colors hover:bg-stone-800 active:bg-stone-950 sm:h-11 sm:px-4 sm:text-xs"
            >
              <span className="truncate">
                {product.customization
                  ? 'Customize drink'
                  : 'Add to order'}
              </span>

              <Plus size={15} strokeWidth={1.8} className="shrink-0" />
            </button>
          </div>
        </div>
      </article>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={`Customize ${product.name}`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-5">
            <img
              src={product.image}
              alt={product.name}
              className="h-16 w-16 shrink-0 rounded-lg bg-stone-100 object-cover sm:h-20 sm:w-20"
            />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900 sm:text-base">
                {product.name}
              </p>

              <p className="mt-1 line-clamp-2 text-xs leading-5 text-stone-500">
                {product.description}
              </p>

              <p className="mt-2 text-sm font-semibold text-stone-900">
                Rp {finalPrice.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {product.customization?.temperature && (
            <Option
              label="Temperature"
              subtitle="Choose your preferred temperature"
              icon={Thermometer}
              value={custom.temperature}
              options={product.customization.temperature}
              onChange={(value) => updateCustom('temperature', value)}
            />
          )}

          {product.customization?.sugarLevel && (
            <Option
              label="Sugar level"
              subtitle="Adjust the sweetness"
              icon={Droplets}
              value={custom.sugarLevel}
              options={product.customization.sugarLevel}
              onChange={(value) => updateCustom('sugarLevel', value)}
            />
          )}

          {product.customization?.milk && (
            <Option
              label="Milk"
              subtitle="Choose your milk preference"
              icon={Milk}
              value={custom.milk}
              options={product.customization.milk}
              onChange={(value) => updateCustom('milk', value)}
            />
          )}

          <div className="border-t border-stone-100 pt-5">
            <Button fullWidth onClick={add}>
              <Plus size={16} />
              Add to cart · Rp {finalPrice.toLocaleString('id-ID')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function Option({
  label,
  subtitle,
  icon: Icon,
  value,
  options,
  onChange,
}) {
  return (
    <section>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
          <Icon size={17} strokeWidth={1.7} />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-stone-900">
            {label}
          </h4>
          <p className="mt-1 text-xs text-stone-500">{subtitle}</p>
        </div>

        <span className="pt-1 text-[10px] uppercase tracking-wider text-stone-400">
          Required
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className={`flex min-h-11 min-w-0 items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-xs transition-colors ${
                selected
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              <span className="break-words">{option}</span>

              {selected && (
                <Check
                  size={14}
                  strokeWidth={2}
                  className="shrink-0"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function computeAddOnPrice(product, custom) {
  let addOn = 0;
  if (product.customization && product.customization.milk) {
    const milkIndex = product.customization.milk.indexOf(custom.milk);
    const milkOption = product.customization.milk[milkIndex];
    if (milkOption && milkOption.includes('(+5rb)')) {
      addOn = 5000;
    }
  }
  return addOn;
}