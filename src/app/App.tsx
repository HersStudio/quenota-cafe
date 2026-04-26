import React, { useState, useEffect, useCallback } from 'react';
import imgBrand from '../assets/237da3dee3ae12b13b13dd5e870e2ac0ba3753ec.png';
import IntroScreen from './components/IntroScreen';
import CatalogScreen from './components/CatalogScreen';
import ProductDetail from './components/ProductDetail';
import PurchasePanel from './components/PurchasePanel';
import OutOfStockModal from './components/OutOfStockModal';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  description: string;
  image: string;
  stock: number;
  price250: number;
  price500: number;
  isSpecialEdition: boolean;
  characteristics: {
    region: string;
    altitude: string;
    variety: string;
    processing: string;
    sensoryProfile: string;
    acidity: string;
    cuppingScore: string;
  };
}

export interface OrderData {
  size: '250g' | '500g' | null;
  grindType: 'grano' | 'media' | 'gruesa' | 'fina' | null;
  quantity: number;
  city: string;
  address: string;
  neighborhood: string;
  details: string;
  paymentMethod: 'breb' | 'efectivo' | 'online' | null;
}

export type Screen = 'intro' | 'catalog' | 'detail' | 'purchase';

const PRODUCTS: Product[] = [
  {
    id: 'bourbon-rosado',
    name: 'BOURBON ROSADO',
    subtitle: 'Edición Especial de Temporada',
    origin: 'Caicedonia, Valle del Cauca',
    description: 'Café exótico con notas cítricas vibrantes y una acidez sutil que lo hacen único. Cada sorbo revela una complejidad de sabores que evoca las montañas colombianas, donde tradición y pasión por el cultivo se encuentran.',
    image: '/images/quenotacafe-bourbon-rosado.png',
    stock: 30,
    price250: 47900,
    price500: 85000,
    isSpecialEdition: true,
    characteristics: {
      region: 'Caicedonia, Valle del Cauca',
      altitude: '1.800 msnm',
      variety: 'Bourbon Rosado',
      processing: 'Lavado',
      sensoryProfile: 'Cítrico, floral, miel',
      acidity: 'Media',
      cuppingScore: '86 pts',
    },
  },
  {
    id: 'regional-del-valle',
    name: 'REGIONAL DEL VALLE',
    subtitle: '',
    origin: 'Caicedonia, Valle del Cauca',
    description: 'Un café regional con cuerpo medio, notas a chocolate y caramelo, y un final suave y balanceado. Perfecto para el día a día.',
    image: '/images/quenotacafe-regional-del-valle.png',
    stock: 30,
    price250: 39900,
    price500: 72000,
    isSpecialEdition: false,
    characteristics: {
      region: 'Caicedonia, Valle del Cauca',
      altitude: '1.650 msnm',
      variety: 'Regional',
      processing: 'Lavado',
      sensoryProfile: 'Chocolate, caramelo, suave',
      acidity: 'Baja',
      cuppingScore: '83 pts',
    },
  },
];

const WHATSAPP_PHONE = '573209028644';

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPurchasePanel, setShowPurchasePanel] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState(1);
  const [outOfStockProduct, setOutOfStockProduct] = useState<Product | null>(null);
  const [orderData, setOrderData] = useState<OrderData>({
    size: null,
    grindType: null,
    quantity: 1,
    city: '',
    address: '',
    neighborhood: '',
    details: '',
    paymentMethod: null,
  });

  const handleIntroComplete = useCallback(() => {
    setScreen('catalog');
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    if (product.stock <= 0) {
      setOutOfStockProduct(product);
    } else {
      setSelectedProduct(product);
      setScreen('detail');
    }
  }, []);

  const handleOutOfStockOrder = useCallback(() => {
    if (outOfStockProduct) {
      setSelectedProduct(outOfStockProduct);
      setOutOfStockProduct(null);
      setScreen('detail');
    }
  }, [outOfStockProduct]);

  const handleBackToCatalog = useCallback(() => {
    setSelectedProduct(null);
    setShowPurchasePanel(false);
    setPurchaseStep(1);
    setOrderData({
      size: null, grindType: null, quantity: 1,
      city: '', address: '', neighborhood: '', details: '',
      paymentMethod: null,
    });
    setScreen('catalog');
  }, []);

  const handleStartPurchase = useCallback(() => {
    setShowPurchasePanel(true);
    setPurchaseStep(1);
  }, []);

  const handleClosePurchasePanel = useCallback(() => {
    setShowPurchasePanel(false);
    setPurchaseStep(1);
  }, []);

  const formatPrice = (price: number) => price.toLocaleString('es-CO');

  const getPricePerUnit = () => {
    if (!selectedProduct) return 0;
    return orderData.size === '500g' ? selectedProduct.price500 : selectedProduct.price250;
  };

  const getTotalPrice = () => getPricePerUnit() * orderData.quantity;

  const getGrindLabel = (grind: string | null) => {
    const labels: Record<string, string> = { grano: 'Grano', media: 'Media', gruesa: 'Gruesa', fina: 'Fina' };
    return grind ? labels[grind] : '';
  };

  const handleWhatsAppClick = () => {
    const grindLabel = getGrindLabel(orderData.grindType);
    const sizeLabel = orderData.size === '250g' ? '250g' : '500g';
    const message = encodeURIComponent(
      `Hola! 👋 Quiero confirmar mi pedido de QUÉ NOTA:\n\n` +
      `☕ ${selectedProduct?.name}\n` +
      `📦 Gramaje: ${sizeLabel}${orderData.quantity > 1 ? ` x ${orderData.quantity}` : ''}\n` +
      `🔪 Molienda: ${grindLabel}\n` +
      `💰 Total: $${formatPrice(getTotalPrice())} (incluye domicilio)\n` +
      `📍 Dirección: ${orderData.address}, ${orderData.neighborhood}, ${orderData.city}\n` +
      `💳 Método de pago: ${orderData.paymentMethod === 'breb' ? 'Bre-B' : orderData.paymentMethod === 'efectivo' ? 'Efectivo' : 'Pago en línea'}\n\n` +
      `¿Cómo coordinamos?`
    );
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${message}`, '_blank');
  };

  return (
    <div className="min-h-dvh">
      {screen === 'intro' && (
        <IntroScreen logo={imgBrand} onComplete={handleIntroComplete} />
      )}

      {screen === 'catalog' && (
        <CatalogScreen
          products={PRODUCTS}
          onProductClick={handleProductClick}
        />
      )}

      {screen === 'detail' && selectedProduct && (
        <div className="relative">
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToCatalog}
            onStartPurchase={handleStartPurchase}
          />
          {showPurchasePanel && (
            <PurchasePanel
              product={selectedProduct}
              orderData={orderData}
              setOrderData={setOrderData}
              step={purchaseStep}
              setStep={setPurchaseStep}
              onClose={handleClosePurchasePanel}
              formatPrice={formatPrice}
              getPricePerUnit={getPricePerUnit}
              getTotalPrice={getTotalPrice}
              getGrindLabel={getGrindLabel}
              onWhatsApp={handleWhatsAppClick}
            />
          )}
        </div>
      )}

      {outOfStockProduct && (
        <OutOfStockModal
          onClose={() => setOutOfStockProduct(null)}
          onOrder={handleOutOfStockOrder}
        />
      )}
    </div>
  );
}
