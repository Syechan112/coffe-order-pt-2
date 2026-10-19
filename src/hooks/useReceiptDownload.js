import html2canvas from 'html2canvas';

export async function downloadReceipt(receiptOrder) {
  if (!receiptOrder) return;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:fixed;left:-9999px;top:0;z-index:-1;';

  const inner = document.createElement('div');
  inner.style.cssText =
    'width:340px;background:#fff;font-family:Arial,sans-serif;';

  const { default: ReactDOMServer } = await import('react-dom/server');
  const { default: receiptEl } = await import(
    '../components/order-flow/receiptTemplate.jsx'
  );

  inner.innerHTML = ReactDOMServer.renderToStaticMarkup(receiptEl(receiptOrder));

  wrapper.appendChild(inner);
  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(inner, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
    });

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${receiptOrder.orderNumber}.png`;
    link.click();
  } finally {
    document.body.removeChild(wrapper);
  }
}
