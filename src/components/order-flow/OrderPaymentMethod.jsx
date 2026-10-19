import { Banknote, Wallet, CreditCard } from 'lucide-react';
import PaymentOption from './PaymentOption';

export default function OrderPaymentMethod({ paymentMethod, setPaymentMethod }) {
  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-stone-900">
          Payment method
        </h2>

        <p className="mt-1 text-sm text-stone-500">
          Select how you would like to pay.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        <PaymentOption
          label="Cash"
          icon={<Banknote size={22} strokeWidth={1.6} />}
          selected={paymentMethod === 'cash'}
          onClick={() => setPaymentMethod('cash')}
        />

        <PaymentOption
          label="QRIS"
          icon={<Wallet size={22} strokeWidth={1.6} />}
          selected={paymentMethod === 'qris'}
          onClick={() => setPaymentMethod('qris')}
        />

        <PaymentOption
          label="E-Wallet"
          icon={<CreditCard size={22} strokeWidth={1.6} />}
          selected={paymentMethod === 'ewallet'}
          onClick={() => setPaymentMethod('ewallet')}
        />
      </div>

      {paymentMethod === 'cash' && (
        <p className="mt-3 text-xs leading-5 text-stone-500">
          Complete your order and pay at the cashier.
        </p>
      )}

      {paymentMethod === 'qris' && (
        <p className="mt-3 text-xs leading-5 text-stone-500">
          A demo QRIS screen will appear for simulated payment confirmation.
        </p>
      )}

      {paymentMethod === 'ewallet' && (
        <p className="mt-3 text-xs leading-5 text-stone-500">
          E-Wallet payment is simulated for this demo.
        </p>
      )}
    </section>
  );
}
