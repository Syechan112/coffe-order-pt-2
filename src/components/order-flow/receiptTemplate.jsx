export default function receiptEl(order) {
  return (
    <div className="relative w-[340px] bg-white p-6 font-sans text-sm text-[#3f2d24]">
      <h2 className="mb-1 text-center text-xl font-bold">BrewFlow</h2>
      <p className="text-center text-xs text-[#6b7280]">
        Receipt / Order #{order.orderNumber}
      </p>

      <div className="my-3 border-t border-dashed border-stone-300" />

      {order.paymentMethod === 'qris' && (
        <div className="mx-auto my-3 flex h-32 w-32 items-center justify-center rounded-xl border-2 border-dashed border-stone-300 text-xs text-stone-500">
          QRIS Dummy
        </div>
      )}

      <table className="w-full text-xs">
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td className="py-1 pr-3">
                {item.quantity}x {item.snapshotName}
              </td>
              <td className="py-1 text-right">
                Rp {item.subtotal.toLocaleString('id-ID')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-3 border-t border-dashed border-stone-300" />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>Rp {order.totalAmount.toLocaleString('id-ID')}</span>
      </div>

      <p className="mt-3 text-center text-xs text-stone-500">
        Paid via{' '}
        {order.paymentMethod === 'cash'
          ? 'Cash'
          : order.paymentMethod === 'qris'
            ? 'QRIS'
            : 'E-Wallet'}
      </p>
    </div>
  );
}
