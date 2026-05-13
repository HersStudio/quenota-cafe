import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Pencil } from 'lucide-react';
import type { Product, OrderData } from '../App';

interface PurchasePanelProps {
  product: Product;
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  step: number;
  setStep: (step: number) => void;
  onClose: () => void;
  formatPrice: (price: number) => string;
  getPricePerUnit: () => number;
  getTotalPrice: () => number;
  getGrindLabel: (grind: string | null) => string;
  onWhatsApp: () => void;
}

function RadioOption({
  selected,
  title,
  description,
  badge,
  onClick,
}: {
  selected: boolean;
  title: string;
  description: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-[16px] border-2 transition-all"
      style={{
        backgroundColor: selected ? '#F2E8E0' : 'transparent',
        borderColor: selected ? '#F2E8E0' : 'rgba(255,255,255,0.4)',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className="text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]"
            style={{ color: selected ? '#1E1E1E' : '#FFFFFF' }}
          >
            {title}
          </h3>
          {badge && (
            <span
              className="text-[12px] font-bold px-2 py-1 rounded-[6px]"
              style={
                selected
                  ? { backgroundColor: '#1E1E1E', color: '#F2E8E0' }
                  : { backgroundColor: '#F2E8E0', color: '#B75929' }
              }
            >
              ✳ {badge}
            </span>
          )}
        </div>
        <div
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-2"
          style={
            selected
              ? { backgroundColor: '#1E1E1E', borderColor: '#1E1E1E' }
              : { borderColor: 'rgba(255,255,255,0.4)' }
          }
        >
          {selected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </div>
      </div>
      <p
        className="text-[14px] leading-[20px]"
        style={{ color: selected ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)' }}
      >
        {description}
      </p>
    </button>
  );
}

function StepHeader({
  step,
  totalSteps,
  onBack,
}: {
  step: number;
  totalSteps: number;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={onBack}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
      >
        <ArrowLeft className="w-5 h-5" style={{ color: '#1E1E1E' }} />
      </button>
      <p className="text-[16px] font-semibold text-white">
        Paso {step} de {totalSteps}
      </p>
    </div>
  );
}

function ContinueButton({
  disabled,
  onClick,
  label = 'CONTINUAR',
}: {
  disabled: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full text-[14px] font-bold uppercase tracking-[0.05em] py-4 rounded-full transition-colors"
      style={{
        backgroundColor: disabled ? 'rgba(30,30,30,0.4)' : '#1E1E1E',
        color: '#FFFFFF',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.backgroundColor = '#2D2D2D'; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.backgroundColor = '#1E1E1E'; }}
    >
      {label}
    </button>
  );
}

function Step1Gramaje({
  orderData,
  setOrderData,
  onContinue,
  onBack,
}: {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <StepHeader step={1} totalSteps={5} onBack={onBack} />
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-[36px] lg:text-[40px] font-bold text-white mb-4 leading-[40px] lg:leading-[48px]">
          GRAMAJE
        </h2>
        <p className="text-[16px] text-white/90 mb-8 leading-[24px]">
          Elige la cantidad de café según cuánto tomas y para cuántas personas es.
        </p>
        <div className="space-y-4 mb-8">
          <RadioOption
            selected={orderData.size === '250g'}
            title="250 gramos"
            description="Perfecto si quieres probar la variedad o tomas café de forma ocasional."
            onClick={() => setOrderData((d) => ({ ...d, size: '250g' }))}
          />
          <RadioOption
            selected={orderData.size === '500g'}
            title="500 gramos"
            description="Recomendado si tomas café todos los días o lo compartes en casa."
            onClick={() => setOrderData((d) => ({ ...d, size: '500g' }))}
          />
        </div>
      </div>
      <ContinueButton disabled={!orderData.size} onClick={onContinue} />
    </div>
  );
}

function Step2Molienda({
  orderData,
  setOrderData,
  onContinue,
  onBack,
}: {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <StepHeader step={2} totalSteps={5} onBack={onBack} />
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-[36px] lg:text-[40px] font-bold text-white mb-4 leading-[40px] lg:leading-[48px]">
          MOLIENDA
        </h2>
        <p className="text-[16px] text-white/90 mb-8 leading-[24px]">
          Elige cómo prefieres tu café según la forma en que lo preparas.
        </p>
        <div className="space-y-4 mb-8">
          <RadioOption
            selected={orderData.grindType === 'grano'}
            title="Grano"
            badge="Recomendado"
            description="Ideal si tienes molino en casa y te gusta disfrutar el café bien fresco."
            onClick={() => setOrderData((d) => ({ ...d, grindType: 'grano' }))}
          />
          <RadioOption
            selected={orderData.grindType === 'media'}
            title="Media"
            description="Perfecta para métodos de goteo, chemex, V60 o cafetera eléctrica."
            onClick={() => setOrderData((d) => ({ ...d, grindType: 'media' }))}
          />
          <RadioOption
            selected={orderData.grindType === 'gruesa'}
            title="Gruesa"
            description="Recomendada para prensa francesa o cold brew."
            onClick={() => setOrderData((d) => ({ ...d, grindType: 'gruesa' }))}
          />
          <RadioOption
            selected={orderData.grindType === 'fina'}
            title="Fina"
            description="Ideal para espresso, moka o ibrik."
            onClick={() => setOrderData((d) => ({ ...d, grindType: 'fina' }))}
          />
        </div>
      </div>
      <ContinueButton disabled={!orderData.grindType} onClick={onContinue} />
    </div>
  );
}

function Step3Address({
  orderData,
  setOrderData,
  onContinue,
  onBack,
}: {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onContinue: () => void;
  onBack: () => void;
}) {
  const isValid = orderData.city && orderData.address.trim() && orderData.neighborhood.trim();

  return (
    <div className="flex flex-col h-full">
      <StepHeader step={3} totalSteps={5} onBack={onBack} />
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-[36px] lg:text-[40px] font-bold text-white mb-4 leading-[40px] lg:leading-[48px]">
          DIRECCIÓN DE ENTREGA
        </h2>
        <p className="text-[16px] text-white/90 mb-8 leading-[24px]">
          ¿A dónde te llevamos tu café?
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-[14px] font-bold text-white mb-2">Ciudad</label>
            <select
              value={orderData.city}
              onChange={(e) => setOrderData((d) => ({ ...d, city: e.target.value }))}
              className="w-full px-4 py-3 rounded-[8px] text-[16px] border-2 border-white/40 focus:border-white focus:outline-none transition-colors"
              style={{ backgroundColor: '#F2E8E0', color: '#1E1E1E' }}
            >
              <option value="">Selecciona tu ciudad</option>
              <option value="Barranquilla">Barranquilla</option>
              <option value="Soledad">Soledad</option>
            </select>
            <p className="text-[12px] text-white/60 mt-1">En el momento entregamos a nivel local.</p>
          </div>

          <div>
            <label className="block text-[14px] font-bold text-white mb-2">Dirección</label>
            <input
              type="text"
              value={orderData.address}
              onChange={(e) => setOrderData((d) => ({ ...d, address: e.target.value }))}
              placeholder="Calle, carrera, número"
              className="w-full px-4 py-3 rounded-[8px] text-[16px] border-2 border-white/40 focus:border-white focus:outline-none transition-colors placeholder:text-[#6A7282]"
              style={{ backgroundColor: '#F2E8E0', color: '#1E1E1E' }}
            />
          </div>

          <div>
            <label className="block text-[14px] font-bold text-white mb-2">Barrio</label>
            <input
              type="text"
              value={orderData.neighborhood}
              onChange={(e) => setOrderData((d) => ({ ...d, neighborhood: e.target.value }))}
              placeholder="Nombre del barrio"
              className="w-full px-4 py-3 rounded-[8px] text-[16px] border-2 border-white/40 focus:border-white focus:outline-none transition-colors placeholder:text-[#6A7282]"
              style={{ backgroundColor: '#F2E8E0', color: '#1E1E1E' }}
            />
          </div>

          <div>
            <label className="block text-[14px] font-bold text-white mb-2">
              Detalles adicionales <span className="font-normal text-white/60">(Opcional)</span>
            </label>
            <input
              type="text"
              value={orderData.details}
              onChange={(e) => setOrderData((d) => ({ ...d, details: e.target.value }))}
              placeholder="Apartamento, torre, conjunto..."
              className="w-full px-4 py-3 rounded-[8px] text-[16px] border-2 border-white/40 focus:border-white focus:outline-none transition-colors placeholder:text-[#6A7282]"
              style={{ backgroundColor: '#F2E8E0', color: '#1E1E1E' }}
            />
          </div>
        </div>
      </div>
      <ContinueButton disabled={!isValid} onClick={onContinue} />
    </div>
  );
}

function Step4Payment({
  orderData,
  setOrderData,
  onContinue,
  onBack,
}: {
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <StepHeader step={4} totalSteps={5} onBack={onBack} />
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-[36px] lg:text-[40px] font-bold text-white mb-4 leading-[40px] lg:leading-[48px]">
          MÉTODO DE PAGO
        </h2>
        <p className="text-[16px] text-white/90 mb-8 leading-[24px]">
          ¿Cómo prefieres pagar tu café?
        </p>
        <div className="space-y-4 mb-8">
          <RadioOption
            selected={orderData.paymentMethod === 'efectivo'}
            title="Efectivo"
            description="Paga al recibir tu pedido en casa."
            onClick={() => setOrderData((d) => ({ ...d, paymentMethod: 'efectivo' }))}
          />
          <RadioOption
            selected={orderData.paymentMethod === 'online'}
            title="Pago en línea"
            description="Paga fácil con tarjeta, PSE o Mercado Pago."
            onClick={() => setOrderData((d) => ({ ...d, paymentMethod: 'online' }))}
          />
        </div>
      </div>
      <ContinueButton disabled={!orderData.paymentMethod} onClick={onContinue} />
    </div>
  );
}

function Step5Summary({
  product,
  orderData,
  setOrderData,
  onBack,
  formatPrice,
  getTotalPrice,
  getGrindLabel,
  onWhatsApp,
  onEditAddress,
  onEditPayment,
  onEditProduct,
}: {
  product: Product;
  orderData: OrderData;
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  onBack: () => void;
  formatPrice: (price: number) => string;
  getTotalPrice: () => number;
  getGrindLabel: (grind: string | null) => string;
  onWhatsApp: () => void;
  onEditAddress: () => void;
  onEditPayment: () => void;
  onEditProduct: () => void;
}) {
  const paymentLabels: Record<string, string> = { efectivo: 'Efectivo', online: 'Pago en línea' };
  const isOnline = orderData.paymentMethod === 'online';

  const handleBoldPayment = async () => {
    try {
      const res = await fetch('/api/create-bold-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getTotalPrice(),
          description: `Pedido Qué Nota Café - ${product.name}`,
          orderId: `QN-${Date.now()}`,
        }),
      });
      const data = await res.json();
      if (data.payment_url) window.open(data.payment_url, '_blank');
    } catch (e) {
      console.error('Error Bold:', e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <StepHeader step={5} totalSteps={5} onBack={onBack} />
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-[36px] lg:text-[40px] font-bold text-white mb-3 leading-[40px] lg:leading-[48px]">
          QUÉ NOTA ESTE RESUMEN
        </h2>
        <p className="text-[16px] text-white/90 mb-8 leading-[24px]">
          Revisa tu pedido antes de finalizar.
        </p>

        {/* Product card */}
        <div className="rounded-[12px] p-4 mb-6" style={{ backgroundColor: '#1E1E1E' }}>
          <div className="flex items-start gap-4">
            <div className="w-[80px] h-[80px] rounded-[8px] overflow-hidden shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-[16px] font-bold text-white mb-1">{product.name}</h3>
                <button onClick={onEditProduct} className="ml-2 shrink-0 p-1" aria-label="Editar producto">
                  <Pencil className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
                </button>
              </div>
              <p className="text-[14px] text-white/80">
                {orderData.size === '250g' ? '250g' : '500g'} · {getGrindLabel(orderData.grindType)}
              </p>
              <div className="flex items-center gap-0 border border-white/40 rounded-[6px] w-fit mt-3">
                <button
                  onClick={() => setOrderData((d) => ({ ...d, quantity: Math.max(1, d.quantity - 1) }))}
                  disabled={orderData.quantity <= 1}
                  className="w-9 h-8 flex items-center justify-center text-white text-[18px] hover:bg-white/10 transition-colors disabled:opacity-30"
                >
                  −
                </button>
                <div className="w-9 h-8 flex items-center justify-center text-white text-[14px] font-semibold border-x border-white/40">
                  {orderData.quantity}
                </div>
                <button
                  onClick={() => setOrderData((d) => ({ ...d, quantity: Math.min(product.stock, d.quantity + 1) }))}
                  disabled={orderData.quantity >= product.stock}
                  className="w-9 h-8 flex items-center justify-center text-white text-[18px] hover:bg-white/10 transition-colors disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start justify-between py-4 border-t border-white/20">
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-bold uppercase text-white/60 mb-1">Dirección</p>
            <p className="text-[14px] text-white leading-[20px]">
              {orderData.address}, {orderData.neighborhood}, {orderData.city}
              {orderData.details && ` — ${orderData.details}`}
            </p>
          </div>
          <button onClick={onEditAddress} className="ml-3 shrink-0 p-1" aria-label="Editar dirección">
            <Pencil className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
          </button>
        </div>

        {/* Payment */}
        <div className="flex items-start justify-between py-4 border-t border-white/20">
          <div>
            <p className="text-[12px] font-bold uppercase text-white/60 mb-1">Método de pago</p>
            <p className="text-[14px] text-white">{orderData.paymentMethod ? paymentLabels[orderData.paymentMethod] : ''}</p>
          </div>
          <button onClick={onEditPayment} className="ml-3 shrink-0 p-1" aria-label="Editar método de pago">
            <Pencil className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
          </button>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between py-4 border-t border-white/20 mb-4">
          <div>
            <p className="text-[20px] font-bold text-white">Total</p>
            <p className="text-[12px] text-white/60">Incluye domicilio</p>
          </div>
          <p className="text-[20px] font-bold text-white">${formatPrice(getTotalPrice())}</p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={isOnline ? handleBoldPayment : () => window.open('https://wa.me/573209028644', '_blank')}
        className="w-full text-[14px] font-bold uppercase tracking-[0.05em] py-4 rounded-full transition-colors"
        style={{ backgroundColor: '#1E1E1E', color: '#F2E8E0' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2D2D2D')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1E1E1E')}
      >
        IR A PAGAR
      </button>
    </div>
  );
}

export default function PurchasePanel({
  product,
  orderData,
  setOrderData,
  step,
  setStep,
  onClose,
  formatPrice,
  getPricePerUnit,
  getTotalPrice,
  getGrindLabel,
  onWhatsApp,
}: PurchasePanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 350);
  };

  const handleBack = () => {
    if (step === 1) {
      handleClose();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <>
      {/* Backdrop — only covers the right half on desktop */}
      <div
        className="fixed inset-0 z-40 transition-opacity"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDuration: '350ms',
        }}
        onClick={handleClose}
      />

      {/* Panel — overlays the right half of the screen */}
      <div
        className="fixed z-50 top-0 right-0 bottom-0 w-full lg:w-1/2 flex items-stretch justify-end transition-transform"
        style={{
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
          transitionDuration: '350ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="w-full lg:m-4 lg:rounded-[16px] p-6 lg:p-8 flex flex-col overflow-y-auto"
          style={{ backgroundColor: '#B75929' }}
        >
        {step === 1 && (
          <Step1Gramaje
            orderData={orderData}
            setOrderData={setOrderData}
            onContinue={() => setStep(2)}
            onBack={handleBack}
          />
        )}
        {step === 2 && (
          <Step2Molienda
            orderData={orderData}
            setOrderData={setOrderData}
            onContinue={() => setStep(3)}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <Step3Address
            orderData={orderData}
            setOrderData={setOrderData}
            onContinue={() => setStep(4)}
            onBack={handleBack}
          />
        )}
        {step === 4 && (
          <Step4Payment
            orderData={orderData}
            setOrderData={setOrderData}
            onContinue={() => setStep(5)}
            onBack={handleBack}
          />
        )}
        {step === 5 && (
          <Step5Summary
            product={product}
            orderData={orderData}
            setOrderData={setOrderData}
            onBack={handleBack}
            formatPrice={formatPrice}
            getTotalPrice={getTotalPrice}
            getGrindLabel={getGrindLabel}
            onWhatsApp={onWhatsApp}
            onEditAddress={() => setStep(3)}
            onEditPayment={() => setStep(4)}
            onEditProduct={() => setStep(1)}
          />
        )}
        </div>
      </div>
    </>
  );
}
