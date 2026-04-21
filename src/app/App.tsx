import image_237da3dee3ae12b13b13dd5e870e2ac0ba3753ec from '../assets/237da3dee3ae12b13b13dd5e870e2ac0ba3753ec.png'
import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

// Imágenes de la marca Qué Nota
const imgBrand = image_237da3dee3ae12b13b13dd5e870e2ac0ba3753ec;
const imgProduct = "https://res.cloudinary.com/dwpz6ygs0/image/upload/f_jpg/cs_srgb/q_auto/dpr_auto/cafe-chiroso_kztm4p.jpg";

interface OrderData {
  size: '250g' | '500g' | null;
  grindType: 'grano' | 'media' | 'gruesa' | 'fina' | null;
  quantity: number;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = landing, 1 = gramaje, 2 = molienda, 3 = resumen
  const [orderData, setOrderData] = useState<OrderData>({
    size: null,
    grindType: null,
    quantity: 1,
  });

  const handleStartOrder = () => {
    setCurrentStep(1); // Ir a paso 1: Gramaje
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectSize = (size: '250g' | '500g') => {
    setOrderData({ ...orderData, size });
  };

  const handleSelectGrindType = (grindType: 'grano' | 'media' | 'gruesa' | 'fina') => {
    setOrderData({ ...orderData, grindType });
  };

  const handleContinueFromStep1 = () => {
    if (orderData.size) {
      setCurrentStep(2); // Ir al paso 2: Molienda
    }
  };

  const handleContinueFromStep2 = () => {
    if (orderData.grindType) {
      setCurrentStep(3); // Ir al paso 3 (resumen)
    }
  };

  const handleIncreaseQuantity = () => {
    setOrderData({ ...orderData, quantity: orderData.quantity + 1 });
  };

  const handleDecreaseQuantity = () => {
    if (orderData.quantity > 1) {
      setOrderData({ ...orderData, quantity: orderData.quantity - 1 });
    }
  };

  const getPricePerUnit = () => {
    return orderData.size === '500g' ? 45000 : 25000;
  };

  const getTotalPrice = () => {
    return getPricePerUnit() * orderData.quantity;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CO');
  };

  const getGrindTypeLabel = () => {
    const labels = {
      grano: 'Grano',
      media: 'Media',
      gruesa: 'Gruesa',
      fina: 'Fina'
    };
    return orderData.grindType ? labels[orderData.grindType] : 'Grano';
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '573209028644';
    const grindLabels: { [key: string]: string } = {
      grano: 'Grano',
      media: 'Media',
      gruesa: 'Gruesa',
      fina: 'Fina'
    };
    
    const message = encodeURIComponent(
      `Hola! 👋 Quiero confirmar mi pedido de QUÉ NOTA:\n\n☕ Café Chiroso\n📦 Gramaje: ${orderData.size === '250g' ? '250g' : '500g'}${orderData.quantity > 1 ? ` x ${orderData.quantity}` : ''}\n🔪 Molienda: ${orderData.grindType ? grindLabels[orderData.grindType] : 'Media'}\n💰 Total: $${formatPrice(getTotalPrice())}\n📍 Ubicación en Barranquilla: \n\n¿Cómo coordinamos la entrega?`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Landing Page (Paso 0)
  if (currentStep === 0) {
    return (
      <div className="min-h-dvh bg-[#f2e8e0]">
        {/* Header Desktop */}
        <div className="hidden lg:block bg-[#f2e8e0] border-b border-[#c86a3a]">
          <div className="max-w-[1200px] mx-auto px-8 py-6 flex justify-center">
            <div className="w-[240px] h-[46px]">
              <img 
                src={image_237da3dee3ae12b13b13dd5e870e2ac0ba3753ec} 
                alt="Qué Nota" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Tagline Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-[10px] px-8 py-3 bg-[#f2e8e0] border-b border-[#c86a3a]">
          <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
          <p className="text-[14px] text-[#1e1e1e] text-center">
            Del grano a tu taza, con sabor que se nota
          </p>
          <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
        </div>

        {/* Desktop Layout - Two Columns */}
        <div className="hidden lg:block bg-[#f2e8e0] py-12">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-2 gap-12 items-start">
              {/* Left Column - Product Image */}
              <div className="relative w-full rounded-[16px] overflow-hidden">
                <img 
                  src={imgProduct} 
                  alt="Café Variedad Chiroso" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1e1e1e] px-3 py-2 rounded-[6px]">
                  <p className="text-[12px] font-bold text-[#34c759]">¡Pedidos abiertos!</p>
                </div>
              </div>

              {/* Right Column - Content */}
              <div>
                {/* Product Title con Badge de stock */}
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-[24px] font-bold text-[#c86a3a] leading-[32px]">LA BUENA VIDA</h2>
                  <div className="bg-[#f2e8e0] border border-[#b75929] px-2 py-1 rounded-[6px]">
                    <p className="text-[12px] font-bold text-[#1e1e1e]">Quedan 24 Und</p>
                  </div>
                </div>

                {/* Product Description */}
                <p className="text-[14px] text-[#1e1e1e] leading-[20px] mb-6">
                  Café exótico con notas cítricas vibrantes y una acidez sutil que lo hacen único. 
                  Cada sorbo revela una complejidad de sabores que evoca las montañas colombianas, 
                  donde tradición y pasión por el cultivo se encuentran.
                </p>

                {/* Features List */}
                <div className="text-[14px] text-[#1e1e1e] leading-[20px] mb-6 space-y-1">
                  <p>✓ Acidez baja</p>
                  <p>✓ Tostado artesanal en pequeños lotes</p>
                  <p>✓ Frescura garantizada</p>
                </div>

                {/* Info Box */}
                <div className="border border-[#1e1e1e] rounded-[8px] p-4 space-y-3 mb-8">
                  <div className="flex items-center gap-2">
                    <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 18 18">
                      <path 
                        d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" 
                        stroke="#B75929" 
                        strokeWidth="1.25"
                      />
                      <path 
                        d="M14.25 7.5C14.25 12 9 15.75 9 15.75C9 15.75 3.75 12 3.75 7.5C3.75 4.60051 6.10051 2.25 9 2.25C11.8995 2.25 14.25 4.60051 14.25 7.5Z" 
                        stroke="#B75929" 
                        strokeWidth="1.25"
                      />
                    </svg>
                    <p className="text-[14px] text-[#1e1e1e] leading-[20px]">
                      <span className="font-bold">Domicilios:</span> Solo en Barranquilla
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 18 18">
                      <path 
                        d="M5.25 1.5V3.75M12.75 1.5V3.75" 
                        stroke="#B75929" 
                        strokeLinecap="square" 
                        strokeWidth="1.66667"
                      />
                      <path 
                        d="M15.75 3H2.25V16.5H15.75V3Z" 
                        stroke="#B75929" 
                        strokeLinecap="square" 
                        strokeWidth="1.25"
                      />
                      <path 
                        d="M2.25 7.5H15.75" 
                        stroke="#B75929" 
                        strokeLinecap="square" 
                        strokeWidth="1.25"
                      />
                    </svg>
                    <p className="text-[14px] text-[#1e1e1e] leading-[20px]">
                      <span className="font-bold">Recibimos pedidos:</span> Lunes a Miércoles
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24">
                      <path 
                        d="M1 8h11v8H1V8z" 
                        stroke="#B75929" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M12 8h4l3 3v5h-7V8z" 
                        stroke="#B75929" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <circle 
                        cx="5.5" 
                        cy="18.5" 
                        r="2" 
                        stroke="#B75929" 
                        strokeWidth="1.5"
                      />
                      <circle 
                        cx="16.5" 
                        cy="18.5" 
                        r="2" 
                        stroke="#B75929" 
                        strokeWidth="1.5"
                      />
                      <path 
                        d="M12 16v2.5M1 16v2.5M19 16v2.5" 
                        stroke="#B75929" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className="text-[14px] text-[#1e1e1e] leading-[20px]">
                      <span className="font-bold">Despachamos:</span> Todos los viernes
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleStartOrder}
                  className="w-full bg-[#b75929] text-white text-[16px] font-semibold py-4 rounded-[8px] hover:bg-[#a04b1f] transition-colors mb-3"
                >
                  Quiero probarlo
                </button>
                <p className="text-[12px] text-center text-black">
                  ¿Preguntas? Escríbenos al{' '}
                  <span className="font-bold text-[#1e1e1e] underline cursor-pointer" onClick={handleWhatsAppClick}>
                    WhatsApp
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden max-w-[480px] mx-auto bg-[#f2e8e0] min-h-dvh relative">
          {/* Header con logo */}
          <div className="bg-[#f2e8e0] flex items-center justify-center h-[74px] w-full">
            <div className="w-[200px] h-[38.29px]">
              <img 
                src={imgBrand} 
                alt="Qué Nota" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Tagline decorado */}
          <div className="flex items-center justify-center gap-[10px] px-[18px] py-3 border-t border-b border-[#c86a3a]">
            <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
            <p className="text-[14px] text-[#1e1e1e] text-center">
              Del grano a tu taza, con sabor que se nota
            </p>
            <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
          </div>

          {/* Main Content */}
          <div className="px-[18px] pb-32 pt-[18px]">
            {/* Product Image con Badge */}
            <div className="relative w-full h-[165px] rounded-[16px] overflow-hidden mb-4">
              <img 
                src={imgProduct} 
                alt="Café Variedad Chiroso" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#1e1e1e] px-2 py-1 rounded-[6px]">
                <p className="text-[12px] font-bold text-[#34c759]">¡Pedidos abiertos!</p>
              </div>
            </div>

            {/* Product Title con Badge de stock */}
            <div className="flex items-center gap-2 mb-3">
              <h1 className="text-[20px] font-bold text-[#c86a3a] leading-[28px]">
                VARIEDAD CHIROSO
              </h1>
              <div className="bg-[#f2e8e0] border border-[#b75929] px-2 py-1 rounded-[6px]">
                <p className="text-[12px] font-bold text-[#1e1e1e]">Quedan 24 Und</p>
              </div>
            </div>

            {/* Product Description */}
            <p className="text-[14px] text-[#1e1e1e] leading-[20px] mb-6">
              Café exótico con notas cítricas vibrantes y una acidez sutil que lo hacen único. 
              Cada sorbo revela una complejidad de sabores que evoca las montañas colombianas, 
              donde tradición y pasión por el cultivo se encuentran.
            </p>

            {/* Features List */}
            <div className="text-[14px] text-[#1e1e1e] leading-[20px] mb-6 space-y-1">
              <p>✓ Acidez media</p>
              <p>✓ Tostado artesanal en pequeños lotes</p>
              <p>✓ Frescura garantizada</p>
            </div>

            {/* Info Box */}
            <div className="border border-[#1e1e1e] rounded-[8px] p-3 space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 18 18">
                  <path 
                    d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" 
                    stroke="#B75929" 
                    strokeWidth="1.25"
                  />
                  <path 
                    d="M14.25 7.5C14.25 12 9 15.75 9 15.75C9 15.75 3.75 12 3.75 7.5C3.75 4.60051 6.10051 2.25 9 2.25C11.8995 2.25 14.25 4.60051 14.25 7.5Z" 
                    stroke="#B75929" 
                    strokeWidth="1.25"
                  />
                </svg>
                <p className="text-[14px] text-[#1e1e1e] leading-[20px]">
                  <span className="font-bold">Domicilios:</span> Solo en Barranquilla
                </p>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 18 18">
                  <path 
                    d="M5.25 1.5V3.75M12.75 1.5V3.75" 
                    stroke="#B75929" 
                    strokeLinecap="square" 
                    strokeWidth="1.66667"
                  />
                  <path 
                    d="M15.75 3H2.25V16.5H15.75V3Z" 
                    stroke="#B75929" 
                    strokeLinecap="square" 
                    strokeWidth="1.25"
                  />
                  <path 
                    d="M2.25 7.5H15.75" 
                    stroke="#B75929" 
                    strokeLinecap="square" 
                    strokeWidth="1.25"
                  />
                </svg>
                <p className="text-[14px] text-[#1e1e1e] leading-[20px]">
                  <span className="font-bold">Recibimos pedidos:</span> Lunes a Miércoles
                </p>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24">
                  <path 
                    d="M1 8h11v8H1V8z" 
                    stroke="#B75929" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M12 8h4l3 3v5h-7V8z" 
                    stroke="#B75929" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <circle 
                    cx="5.5" 
                    cy="18.5" 
                    r="2" 
                    stroke="#B75929" 
                    strokeWidth="1.5"
                  />
                  <circle 
                    cx="16.5" 
                    cy="18.5" 
                    r="2" 
                    stroke="#B75929" 
                    strokeWidth="1.5"
                  />
                  <path 
                    d="M12 16v2.5M1 16v2.5M19 16v2.5" 
                    stroke="#B75929" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-[14px] text-[#1e1e1e] leading-[20px]">
                  <span className="font-bold">Despachamos:</span> Todos los viernes
                </p>
              </div>
            </div>
          </div>

          {/* Fixed Bottom CTA */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#f2e8e0] px-[18px] pt-[18px] pb-8 space-y-[10px] max-w-[480px] mx-auto">
            <button
              onClick={handleStartOrder}
              className="w-full bg-[#b75929] text-white text-[16px] font-semibold py-4 rounded-[8px] hover:bg-[#a04b1f] transition-colors"
            >
              Quiero probarlo
            </button>
            <p className="text-[12px] text-center text-black">
              ¿Preguntas? Escríbenos al{' '}
              <span className="font-bold text-[#1e1e1e] underline cursor-pointer" onClick={handleWhatsAppClick}>
                WhatsApp
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Paso 1: Gramaje
  if (currentStep === 1) {
    return (
      <div className="min-h-dvh bg-[#f2e8e0] lg:bg-[#f2e8e0]">
        {/* Header Desktop */}
        <div className="hidden lg:block bg-[#f2e8e0] border-b border-[#c86a3a]">
          <div className="max-w-[1200px] mx-auto px-8 py-6 flex justify-center">
            <div className="w-[240px] h-[46px]">
              <img 
                src={imgBrand} 
                alt="Qué Nota" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Tagline Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-[10px] px-8 py-3 bg-[#f2e8e0] border-b border-[#c86a3a]">
          <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
          <p className="text-[14px] text-[#1e1e1e] text-center">
            Del grano a tu taza, con sabor que se nota
          </p>
          <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
        </div>

        {/* Desktop Layout - Two Columns */}
        <div className="hidden lg:block bg-[#f2e8e0] py-12">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-2 gap-12 items-start">
              {/* Left Column - Product Image */}
              <div className="relative w-full rounded-[16px] overflow-hidden">
                <img 
                  src={imgProduct} 
                  alt="Café Variedad Chiroso" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1e1e1e] px-3 py-2 rounded-[6px]">
                  <p className="text-[12px] font-bold text-[#34c759]">¡Pedidos abiertos!</p>
                </div>
              </div>

              {/* Right Column - Gramaje Card */}
              <div className="bg-[#b75929] rounded-[16px] p-8 flex flex-col min-h-[600px]">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={handleBack}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#1e1e1e]" />
                  </button>
                  <p className="text-[16px] font-semibold text-white">Paso 1 de 3</p>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-[40px] font-bold text-white mb-4 leading-[48px]">
                    Gramaje
                  </h2>
                  <p className="text-[16px] text-white/90 mb-8 leading-[24px]">
                    Elige la cantidad de café según cuánto tomas y para cuántas personas es.
                  </p>

                  {/* Opciones */}
                  <div className="space-y-4 mb-8">
                    {/* Opción 250g */}
                    <button
                      onClick={() => handleSelectSize('250g')}
                      className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                        orderData.size === '250g'
                          ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                          : 'bg-transparent border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-[24px] font-bold leading-[32px] ${
                          orderData.size === '250g' ? 'text-[#1e1e1e]' : 'text-white'
                        }`}>
                          250 gramos
                        </h3>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          orderData.size === '250g'
                            ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                            : 'border-white/40'
                        }`}>
                          {orderData.size === '250g' && (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <p className={`text-[14px] leading-[20px] ${
                        orderData.size === '250g' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                      }`}>
                        Perfecto si quieres probar la variedad o tomas café de forma ocasional.
                      </p>
                    </button>

                    {/* Opción 500g */}
                    <button
                      onClick={() => handleSelectSize('500g')}
                      className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                        orderData.size === '500g'
                          ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                          : 'bg-transparent border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-[24px] font-bold leading-[32px] ${
                          orderData.size === '500g' ? 'text-[#1e1e1e]' : 'text-white'
                        }`}>
                          500 gramos
                        </h3>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          orderData.size === '500g'
                            ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                            : 'border-white/40'
                        }`}>
                          {orderData.size === '500g' && (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <p className={`text-[14px] leading-[20px] ${
                        orderData.size === '500g' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                      }`}>
                        Recomendado si tomas café todos los días o lo compartes en casa.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handleContinueFromStep1}
                  disabled={!orderData.size}
                  className={`w-full text-white text-[16px] font-semibold py-4 rounded-[8px] transition-colors ${
                    orderData.size
                      ? 'bg-[#1e1e1e] hover:bg-[#2e2e2e]'
                      : 'bg-[#1e1e1e]/40 cursor-not-allowed'
                  }`}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden max-w-[480px] mx-auto bg-[#b75929] min-h-dvh relative flex flex-col">
          {/* Header con botón atrás y paso */}
          <div className="bg-[#b75929] px-[18px] py-4 flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#1e1e1e]" />
            </button>
            <p className="text-[16px] font-semibold text-white">Paso 1 de 3</p>
          </div>

          {/* Content */}
          <div className="flex-1 px-[18px] py-8">
            <h1 className="text-[40px] font-bold text-white mb-4 leading-[48px]">
              Gramaje
            </h1>
            <p className="text-[16px] text-white/90 mb-8 leading-[24px]">
              Elige la cantidad de café según cuánto tomas y para cuántas personas es.
            </p>

            {/* Opciones */}
            <div className="space-y-4">
              {/* Opción 250g */}
              <button
                onClick={() => handleSelectSize('250g')}
                className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                  orderData.size === '250g'
                    ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                    : 'bg-transparent border-white/40'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-[24px] font-bold leading-[32px] ${
                    orderData.size === '250g' ? 'text-[#1e1e1e]' : 'text-white'
                  }`}>
                    250 gramos
                  </h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    orderData.size === '250g'
                      ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                      : 'border-white/40'
                  }`}>
                    {orderData.size === '250g' && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                <p className={`text-[14px] leading-[20px] ${
                  orderData.size === '250g' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                }`}>
                  Perfecto si quieres probar la variedad o tomas café de forma ocasional.
                </p>
              </button>

              {/* Opción 500g */}
              <button
                onClick={() => handleSelectSize('500g')}
                className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                  orderData.size === '500g'
                    ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                    : 'bg-transparent border-white/40'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-[24px] font-bold leading-[32px] ${
                    orderData.size === '500g' ? 'text-[#1e1e1e]' : 'text-white'
                  }`}>
                    500 gramos
                  </h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    orderData.size === '500g'
                      ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                      : 'border-white/40'
                  }`}>
                    {orderData.size === '500g' && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                <p className={`text-[14px] leading-[20px] ${
                  orderData.size === '500g' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                }`}>
                  Recomendado si tomas café todos los días o lo compartes en casa.
                </p>
              </button>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="bg-[#b75929] px-[18px] pb-8 pt-4">
            <button
              onClick={handleContinueFromStep1}
              disabled={!orderData.size}
              className={`w-full text-white text-[16px] font-semibold py-4 rounded-[8px] transition-colors ${
                orderData.size
                  ? 'bg-[#1e1e1e] hover:bg-[#2e2e2e]'
                  : 'bg-[#1e1e1e]/40 cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Paso 2: Molienda
  if (currentStep === 2) {
    return (
      <div className="min-h-dvh bg-[#f2e8e0]">
        {/* Header Desktop */}
        <div className="hidden lg:block bg-[#f2e8e0] border-b border-[#c86a3a]">
          <div className="max-w-[1200px] mx-auto px-8 py-6 flex justify-center">
            <div className="w-[240px] h-[46px]">
              <img 
                src={imgBrand} 
                alt="Qué Nota" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Tagline Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-[10px] px-8 py-3 bg-[#f2e8e0] border-b border-[#c86a3a]">
          <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
          <p className="text-[14px] text-[#1e1e1e] text-center">
            Del grano a tu taza, con sabor que se nota
          </p>
          <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
        </div>

        {/* Desktop Layout - Two Columns */}
        <div className="hidden lg:block bg-[#f2e8e0] py-12">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-2 gap-12 items-start">
              {/* Left Column - Product Image */}
              <div className="relative w-full rounded-[16px] overflow-hidden">
                <img 
                  src={imgProduct} 
                  alt="Café Variedad Chiroso" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1e1e1e] px-3 py-2 rounded-[6px]">
                  <p className="text-[12px] font-bold text-[#34c759]">¡Pedidos abiertos!</p>
                </div>
              </div>

              {/* Right Column - Molienda Card */}
              <div className="bg-[#b75929] rounded-[16px] p-8 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={handleBack}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#1e1e1e]" />
                  </button>
                  <p className="text-[16px] font-semibold text-white">Paso 2 de 3</p>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-[40px] font-bold text-white mb-4 leading-[48px]">
                    Molienda
                  </h2>
                  <p className="text-[16px] text-white/90 mb-8 leading-[24px]">
                    Elige cómo prefieres tu café según la forma en que lo preparas.
                  </p>

                  {/* Opciones */}
                  <div className="space-y-4 mb-8">
                    {/* Opción Grano */}
                    <button
                      onClick={() => handleSelectGrindType('grano')}
                      className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                        orderData.grindType === 'grano'
                          ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                          : 'bg-transparent border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-[24px] font-bold leading-[32px] ${
                          orderData.grindType === 'grano' ? 'text-[#1e1e1e]' : 'text-white'
                        }`}>
                          Grano
                        </h3>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          orderData.grindType === 'grano'
                            ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                            : 'border-white/40'
                        }`}>
                          {orderData.grindType === 'grano' && (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <p className={`text-[14px] leading-[20px] ${
                        orderData.grindType === 'grano' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                      }`}>
                        Ideal si tienes molino en casa y te gusta disfrutar el café bien fresco.
                      </p>
                    </button>

                    {/* Opción Media */}
                    <button
                      onClick={() => handleSelectGrindType('media')}
                      className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                        orderData.grindType === 'media'
                          ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                          : 'bg-transparent border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-[24px] font-bold leading-[32px] ${
                            orderData.grindType === 'media' ? 'text-[#1e1e1e]' : 'text-white'
                          }`}>
                            Media
                          </h3>
                          <span className={`text-[12px] font-bold px-2 py-1 rounded-[6px] ${
                            orderData.grindType === 'media' 
                              ? 'bg-[#1e1e1e] text-[#f2e8e0]' 
                              : 'bg-[#f2e8e0] text-[#b75929]'
                          }`}>
                            ★ Recomendado
                          </span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          orderData.grindType === 'media'
                            ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                            : 'border-white/40'
                        }`}>
                          {orderData.grindType === 'media' && (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <p className={`text-[14px] leading-[20px] ${
                        orderData.grindType === 'media' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                      }`}>
                        Perfecta para métodos de goteo, chemex, V60 o cafetera eléctrica.
                      </p>
                    </button>

                    {/* Opción Gruesa */}
                    <button
                      onClick={() => handleSelectGrindType('gruesa')}
                      className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                        orderData.grindType === 'gruesa'
                          ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                          : 'bg-transparent border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-[24px] font-bold leading-[32px] ${
                          orderData.grindType === 'gruesa' ? 'text-[#1e1e1e]' : 'text-white'
                        }`}>
                          Gruesa
                        </h3>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          orderData.grindType === 'gruesa'
                            ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                            : 'border-white/40'
                        }`}>
                          {orderData.grindType === 'gruesa' && (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <p className={`text-[14px] leading-[20px] ${
                        orderData.grindType === 'gruesa' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                      }`}>
                        Recomendada para prensa francesa o cold brew.
                      </p>
                    </button>

                    {/* Opción Fina */}
                    <button
                      onClick={() => handleSelectGrindType('fina')}
                      className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                        orderData.grindType === 'fina'
                          ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                          : 'bg-transparent border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-[24px] font-bold leading-[32px] ${
                          orderData.grindType === 'fina' ? 'text-[#1e1e1e]' : 'text-white'
                        }`}>
                          Fina
                        </h3>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          orderData.grindType === 'fina'
                            ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                            : 'border-white/40'
                        }`}>
                          {orderData.grindType === 'fina' && (
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          )}
                        </div>
                      </div>
                      <p className={`text-[14px] leading-[20px] ${
                        orderData.grindType === 'fina' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                      }`}>
                        Ideal para espresso, moka o ibrik.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handleContinueFromStep2}
                  disabled={!orderData.grindType}
                  className={`w-full text-white text-[16px] font-semibold py-4 rounded-[8px] transition-colors ${
                    orderData.grindType
                      ? 'bg-[#1e1e1e] hover:bg-[#2e2e2e]'
                      : 'bg-[#1e1e1e]/40 cursor-not-allowed'
                  }`}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden max-w-[480px] mx-auto bg-[#b75929] min-h-dvh relative flex flex-col">
          {/* Header con botón atrás y paso */}
          <div className="bg-[#b75929] px-[18px] py-4 flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#1e1e1e]" />
            </button>
            <p className="text-[16px] font-semibold text-white">Paso 2 de 3</p>
          </div>

          {/* Content */}
          <div className="flex-1 px-[18px] py-8">
            <h1 className="text-[40px] font-bold text-white mb-4 leading-[48px]">
              Molienda
            </h1>
            <p className="text-[16px] text-white/90 mb-8 leading-[24px]">
              Elige cómo quieres que esté molido tu café.
            </p>

            {/* Opciones */}
            <div className="space-y-4">
              {/* Opción Grano */}
              <button
                onClick={() => handleSelectGrindType('grano')}
                className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                  orderData.grindType === 'grano'
                    ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                    : 'bg-transparent border-white/40'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-[24px] font-bold leading-[32px] ${
                    orderData.grindType === 'grano' ? 'text-[#1e1e1e]' : 'text-white'
                  }`}>
                    Grano
                  </h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    orderData.grindType === 'grano'
                      ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                      : 'border-white/40'
                  }`}>
                    {orderData.grindType === 'grano' && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                <p className={`text-[14px] leading-[20px] ${
                  orderData.grindType === 'grano' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                }`}>
                  Ideal si tienes molino en casa y te gusta disfrutar el café bien fresco.
                </p>
              </button>

              {/* Opción Media */}
              <button
                onClick={() => handleSelectGrindType('media')}
                className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                  orderData.grindType === 'media'
                    ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                    : 'bg-transparent border-white/40'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-[24px] font-bold leading-[32px] ${
                      orderData.grindType === 'media' ? 'text-[#1e1e1e]' : 'text-white'
                    }`}>
                      Media
                    </h3>
                    <span className={`text-[12px] font-bold px-2 py-1 rounded-[6px] ${
                      orderData.grindType === 'media' 
                        ? 'bg-[#1e1e1e] text-[#f2e8e0]' 
                        : 'bg-[#f2e8e0] text-[#b75929]'
                    }`}>
                      ★ Recomendado
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    orderData.grindType === 'media'
                      ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                      : 'border-white/40'
                  }`}>
                    {orderData.grindType === 'media' && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                <p className={`text-[14px] leading-[20px] ${
                  orderData.grindType === 'media' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                }`}>
                  Perfecta para métodos de goteo, chemex, V60 o cafetera eléctrica.
                </p>
              </button>

              {/* Opción Gruesa */}
              <button
                onClick={() => handleSelectGrindType('gruesa')}
                className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                  orderData.grindType === 'gruesa'
                    ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                    : 'bg-transparent border-white/40'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-[24px] font-bold leading-[32px] ${
                    orderData.grindType === 'gruesa' ? 'text-[#1e1e1e]' : 'text-white'
                  }`}>
                    Gruesa
                  </h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    orderData.grindType === 'gruesa'
                      ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                      : 'border-white/40'
                  }`}>
                    {orderData.grindType === 'gruesa' && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                <p className={`text-[14px] leading-[20px] ${
                  orderData.grindType === 'gruesa' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                }`}>
                  Recomendada para prensa francesa o cold brew.
                </p>
              </button>

              {/* Opción Fina */}
              <button
                onClick={() => handleSelectGrindType('fina')}
                className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                  orderData.grindType === 'fina'
                    ? 'bg-[#f2e8e0] border-[#f2e8e0]'
                    : 'bg-transparent border-white/40'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-[24px] font-bold leading-[32px] ${
                    orderData.grindType === 'fina' ? 'text-[#1e1e1e]' : 'text-white'
                  }`}>
                    Fina
                  </h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    orderData.grindType === 'fina'
                      ? 'bg-[#1e1e1e] border-[#1e1e1e]'
                      : 'border-white/40'
                  }`}>
                    {orderData.grindType === 'fina' && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                <p className={`text-[14px] leading-[20px] ${
                  orderData.grindType === 'fina' ? 'text-[#1e1e1e]/80' : 'text-white/80'
                }`}>
                  Ideal para espresso, moka o ibrik.
                </p>
              </button>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="bg-[#b75929] px-[18px] pb-8 pt-4">
            <button
              onClick={handleContinueFromStep2}
              disabled={!orderData.grindType}
              className={`w-full text-white text-[16px] font-semibold py-4 rounded-[8px] transition-colors ${
                orderData.grindType
                  ? 'bg-[#1e1e1e] hover:bg-[#2e2e2e]'
                  : 'bg-[#1e1e1e]/40 cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Paso 3: Resumen
  if (currentStep === 3) {
    return (
      <div className="min-h-dvh bg-[#f2e8e0]">
        {/* Header Desktop */}
        <div className="hidden lg:block bg-[#f2e8e0] border-b border-[#c86a3a]">
          <div className="max-w-[1200px] mx-auto px-8 py-6 flex justify-center">
            <div className="w-[240px] h-[46px]">
              <img 
                src={imgBrand} 
                alt="Qué Nota" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Tagline Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-[10px] px-8 py-3 bg-[#f2e8e0] border-b border-[#c86a3a]">
          <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
          <p className="text-[14px] text-[#1e1e1e] text-center">
            Del grano a tu taza, con sabor que se nota
          </p>
          <div className="w-2 h-2 bg-[#b75929] rounded-full shrink-0" />
        </div>

        {/* Desktop Layout - Two Columns */}
        <div className="hidden lg:block bg-[#f2e8e0] py-12">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-2 gap-12 items-start">
              {/* Left Column - Product Image */}
              <div className="relative w-full rounded-[16px] overflow-hidden">
                <img 
                  src={imgProduct} 
                  alt="Café Variedad Chiroso" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1e1e1e] px-3 py-2 rounded-[6px]">
                  <p className="text-[12px] font-bold text-[#34c759]">¡Pedidos abiertos!</p>
                </div>
              </div>

              {/* Right Column - Resumen Card */}
              <div className="bg-[#b75929] rounded-[16px] p-8 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={handleBack}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#1e1e1e]" />
                  </button>
                  <p className="text-[16px] font-semibold text-white">Paso 3 de 3</p>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-[40px] font-bold text-white mb-8 leading-[48px]">
                    Qué nota de resumen
                  </h2>

                  {/* Card del producto */}
                  <div className="bg-[#1e1e1e] rounded-[12px] p-4 mb-6">
                    <div className="flex items-start gap-4">
                      {/* Imagen del producto */}
                      <div className="w-[100px] h-[100px] rounded-[8px] overflow-hidden shrink-0">
                        <img 
                          src={imgProduct} 
                          alt="Café Chiroso" 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Detalles */}
                      <div className="flex-1">
                        <h3 className="text-[16px] font-bold text-white mb-2">
                          CAFÉ CHIROSO
                        </h3>
                        <p className="text-[14px] text-white/90 mb-1">
                          Gramaje: {orderData.size === '250g' ? '250 gr' : '500 gr'}
                        </p>
                        <p className="text-[14px] text-white/90 mb-3">
                          Molienda: {getGrindTypeLabel()}
                        </p>

                        {/* Control de cantidad */}
                        <div className="flex items-center gap-0 border-2 border-white/40 rounded-[6px] w-fit">
                          <button
                            onClick={handleDecreaseQuantity}
                            disabled={orderData.quantity <= 1}
                            className="w-10 h-8 flex items-center justify-center text-white text-[18px] hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            −
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center text-white text-[14px] font-semibold border-x border-white/40">
                            {orderData.quantity}
                          </div>
                          <button
                            onClick={handleIncreaseQuantity}
                            className="w-10 h-8 flex items-center justify-center text-white text-[18px] hover:bg-white/10 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Separador */}
                  <div className="h-[2px] bg-white/40 mb-4" />

                  {/* Total */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[20px] font-bold text-white">Total</p>
                    <p className="text-[20px] font-bold text-white">${formatPrice(getTotalPrice())}</p>
                  </div>

                  {/* Separador */}
                  <div className="h-[2px] bg-white/40 mb-6" />

                  {/* ¿Cómo funciona? */}
                  <h3 className="text-[20px] font-bold text-white mb-4">
                    ¿Cómo funciona?
                  </h3>

                  <div className="space-y-2 mb-4">
                    <p className="text-[14px] text-white/90 leading-[20px]">
                      1. Confirma tu pedido por WhatsApp
                    </p>
                    <p className="text-[14px] text-white/90 leading-[20px]">
                      2. Coordinaremos pago (transferencia) y dirección
                    </p>
                    <p className="text-[14px] text-white/90 leading-[20px]">
                      3. Tu café se empacará fresco y entregará el viernes
                    </p>
                  </div>

                  {/* Nota de ubicación */}
                  <div className="flex items-start gap-2">
                    <svg className="w-[18px] h-[18px] shrink-0 mt-[2px]" fill="none" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" />
                      <path d="M10 6v4l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="text-[14px] text-white/90 leading-[20px]">
                      Solo atendemos en Barranquilla
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full text-white text-[16px] font-semibold py-4 rounded-[8px] transition-colors bg-[#1e1e1e] hover:bg-[#2e2e2e] mt-6"
                >
                  Confirmar pedido por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden max-w-[480px] mx-auto bg-[#b75929] min-h-dvh relative flex flex-col">
          {/* Header con botón atrás y paso */}
          <div className="bg-[#b75929] px-[18px] py-4 flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#1e1e1e]" />
            </button>
            <p className="text-[16px] font-semibold text-white">Paso 3 de 3</p>
          </div>

          {/* Content */}
          <div className="flex-1 px-[18px] py-8 pb-32">
            <h1 className="text-[40px] font-bold text-white mb-8 leading-[48px]">
              Qué nota de resumen
            </h1>

            {/* Card del producto */}
            <div className="flex items-start gap-4 mb-6">
              {/* Imagen del producto */}
              <div className="w-[120px] h-[120px] rounded-[12px] overflow-hidden shrink-0">
                <img 
                  src={imgProduct} 
                  alt="Café Chiroso" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Detalles */}
              <div className="flex-1">
                <h2 className="text-[20px] font-bold text-white mb-2 leading-[28px]">
                  CAFÉ CHIROSO
                </h2>
                <p className="text-[16px] text-white/90 mb-1">
                  Gramaje: {orderData.size === '250g' ? '250 gr' : '500 gr'}
                </p>
                <p className="text-[16px] text-white/90 mb-4">
                  Molienda: {getGrindTypeLabel()}
                </p>

                {/* Control de cantidad */}
                <div className="flex items-center gap-0 border-2 border-white/40 rounded-[8px] w-fit">
                  <button
                    onClick={handleDecreaseQuantity}
                    disabled={orderData.quantity <= 1}
                    className="w-12 h-10 flex items-center justify-center text-white text-[20px] hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center text-white text-[16px] font-semibold border-x border-white/40">
                    {orderData.quantity}
                  </div>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="w-12 h-10 flex items-center justify-center text-white text-[20px] hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className="h-[2px] bg-white/40 mb-6" />

            {/* Total */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-[24px] font-bold text-white">Total</p>
              <p className="text-[24px] font-bold text-white">${formatPrice(getTotalPrice())}</p>
            </div>

            {/* Separador */}
            <div className="h-[2px] bg-white/40 mb-6" />

            {/* ¿Cómo funciona? */}
            <h3 className="text-[24px] font-bold text-white mb-4 leading-[32px]">
              ¿Cómo funciona?
            </h3>

            <div className="space-y-3 mb-6">
              <p className="text-[16px] text-white/90 leading-[24px]">
                1. Confirma tu pedido por WhatsApp
              </p>
              <p className="text-[16px] text-white/90 leading-[24px]">
                2. Coordinaremos pago (transferencia) y dirección
              </p>
              <p className="text-[16px] text-white/90 leading-[24px]">
                3. Tu café se empacará fresco y entregará el viernes
              </p>
            </div>

            {/* Nota de ubicación */}
            <div className="flex items-start gap-2">
              <svg className="w-[20px] h-[20px] shrink-0 mt-[2px]" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" />
                <path d="M10 6v4l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-[14px] text-white/90 leading-[20px]">
                Solo atendemos en Barranquilla
              </p>
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#b75929] px-[18px] pb-8 pt-4 max-w-[480px] mx-auto">
            <button
              onClick={handleWhatsAppClick}
              className="w-full text-white text-[16px] font-semibold py-4 rounded-[8px] transition-colors bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              Confirmar pedido por WhatsApp
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}