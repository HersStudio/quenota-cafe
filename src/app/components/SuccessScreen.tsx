import React from 'react';

interface OrderInfo {
  productName: string;
  weight: string;
  grind: string;
  total: number;
  address: string;
  neighborhood: string;
  city: string;
}

export default function SuccessScreen({ logo }: { logo: string }) {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  const externalRef = params.get('external_reference');

  let order: OrderInfo | null = null;
  try {
    if (externalRef) order = JSON.parse(externalRef);
  } catch {
    order = null;
  }

  if (status !== 'approved' || !order) {
    return (
      <div
        className="min-h-dvh flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: '#F2E8E0' }}
      >
        <img src={logo} alt="Qué Nota Café" className="w-[120px] mb-8" />
        <p className="text-[18px] font-semibold" style={{ color: '#1E1E1E' }}>
          No pudimos verificar tu pago.
        </p>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `✅ PAGO APROBADO - QUÉ NOTA\n\n` +
      `☕ ${order!.productName}\n` +
      `⚖️ Gramaje: ${order!.weight}g · ${order!.grind}\n` +
      `💰 Total: $${order!.total.toLocaleString()}\n` +
      `📍 ${order!.address}, ${order!.neighborhood}, ${order!.city}\n` +
      `💳 Pago en línea (MercadoPago)\n\n` +
      `¡Ya puedes preparar mi pedido!`
    );
    window.open(`https://wa.me/573209028644?text=${message}`, '_blank');
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: '#F2E8E0' }}
    >
      <img src={logo} alt="Qué Nota Café" className="w-[120px] mb-8" />

      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: '#22C55E' }}
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1
        className="text-[32px] font-bold mb-2 text-center leading-[38px]"
        style={{ color: '#1E1E1E' }}
      >
        {'¡'}Qu{'é'} nota tu pedido!
      </h1>
      <p className="text-[16px] mb-10 text-center" style={{ color: '#1E1E1E' }}>
        Tu pago fue aprobado.
      </p>

      <div
        className="w-full max-w-[400px] rounded-[16px] p-6 mb-8 text-left"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <p className="text-[14px] leading-[22px]" style={{ color: '#1E1E1E' }}>
          <span className="font-bold">{'☕'} {order.productName}</span>
          <br />
          {'⚖️'} Gramaje: {order.weight}g {'·'} {order.grind}
          <br />
          {'💰'} Total: ${order.total.toLocaleString()}
          <br />
          {'📍'} {order.address}, {order.neighborhood}, {order.city}
          <br />
          {'💳'} Pago en l{'í'}nea (MercadoPago)
        </p>
      </div>

      <button
        onClick={handleWhatsApp}
        className="w-full max-w-[400px] text-[14px] font-bold uppercase tracking-[0.05em] py-4 rounded-full transition-colors"
        style={{ backgroundColor: '#1E1E1E', color: '#F2E8E0' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2D2D2D')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1E1E1E')}
      >
        CONFIRMAR POR WHATSAPP
      </button>
    </div>
  );
}
