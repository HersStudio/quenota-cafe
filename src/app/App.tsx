import React, { useState, useEffect, useCallback } from 'react';
import imgBrand from '../assets/237da3dee3ae12b13b13dd5e870e2ac0ba3753ec.png';
import { supabase } from '../lib/supabase';
import IntroScreen from './components/IntroScreen';
import CatalogScreen from './components/CatalogScreen';
import ProductDetail from './components/ProductDetail';
import PurchasePanel from './components/PurchasePanel';
import OutOfStockModal from './components/OutOfStockModal';
import SuccessScreen from './components/SuccessScreen';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  description: string;
  image: string;
  detailImage: string;
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

export type Screen = 'intro' | 'catalog' | 'detail' | 'purchase' | 'success';

const NOMBRE_TO_ID: Record<string, string> = {
  'Honey': 'honey',
  'Bourbon Rosado': 'bourbon-rosado',
  'Regional del Valle': 'regional-del-valle',
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'honey',
    name: 'HONEY',
    subtitle: 'Edición Especial de Temporada',
    origin: 'Caicedonia, Valle del Cauca',
    description: 'Café de proceso honey con notas a miel, durazno, mandarina y caramelo. Una acidez jugosa y cítrica que lo hace vibrante y dulce, ideal para quienes buscan una taza compleja con el encanto de los cafés de temporada.',
    image: '/images/quenotacafe-honey.png',
    detailImage: '/images/quenotacafe-honey-2.png',
    stock: 30,
    price250: 43900,
    price500: 79900,
    isSpecialEdition: true,
    characteristics: {
      region: 'Caicedonia, Valle del Cauca, Colombia',
      altitude: '1.650 MSNM',
      variety: 'Castillo',
      processing: 'Honey',
      sensoryProfile: 'Miel, Durazno, Mandarina, Panela, Frutos Amarillos y Caramelo',
      acidity: 'Jugosa Cítrica',
      cuppingScore: '85.2',
    },
  },
  {
    id: 'bourbon-rosado',
    name: 'BOURBON ROSADO',
    subtitle: 'Edición Especial de Temporada',
    origin: 'Caicedonia, Valle del Cauca',
    description: 'Café exótico con notas cítricas vibrantes y una acidez sutil que lo hacen único. Cada sorbo revela una complejidad de sabores que evoca las montañas colombianas, donde tradición y pasión por el cultivo se encuentran.',
    image: '/images/quenotacafe-bourbon-rosado.png',
    detailImage: '/images/quenotacafe-bourbon-rosado-2.png',
    stock: 30,
    price250: 47900,
    price500: 85000,
    isSpecialEdition: false,
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
    detailImage: '/images/quenotacafe-regional-del-valle-2.png',
    stock: 30,
    price250: 39900,
    price500: 72000,
    isSpecialEdition: false,
    characteristics: {
      region: 'Caicedonia, Valle del Cauca, Colombia',
      altitude: '1.650 MSNM',
      variety: 'Regional del Valle',
      processing: 'Lavado',
      sensoryProfile: 'Nueces, Panela, Chocolate, Caramelo, Almendras, Frutos Rojos',
      acidity: 'Cítrica Suave',
      cuppingScore: '83.25',
    },
  },
];

const WHATSAPP_PHONE = '573209028644';

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'] as const;
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'] as const;

function getNextDispatchDate(): string {
  const today = new Date();
  const day = today.getDay();
  const daysUntil: Record<number, number> = {
    0: 5, // domingo → viernes
    1: 4, // lunes → viernes
    2: 3, // martes → viernes
    3: 2, // miércoles → viernes
    4: 1, // jueves → viernes
    5: 1, // viernes → sábado
    6: 6, // sábado → viernes siguiente
  };
  const target = new Date(today);
  target.setDate(today.getDate() + daysUntil[day]);
  return `${DIAS[target.getDay()]} ${target.getDate()} de ${MESES[target.getMonth()]}`;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [screen, setScreen] = useState<Screen>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('status') && params.get('external_reference') ? 'success' : 'intro';
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPurchasePanel, setShowPurchasePanel] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState(1);
  const [outOfStockProduct, setOutOfStockProduct] = useState<Product | null>(null);
  const [isNextDispatch, setIsNextDispatch] = useState(false);
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

  useEffect(() => {
    supabase
      .from('productos')
      .select('nombre, stock')
      .then(({ data }) => {
        if (!data) return;
        setProducts((prev) =>
          prev.map((p) => {
            const row = data.find((r) => NOMBRE_TO_ID[r.nombre] === p.id);
            return row ? { ...p, stock: row.stock } : p;
          }),
        );
      });

    const channel = supabase
      .channel('productos-stock')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'productos' },
        (payload) => {
          const { nombre, stock } = payload.new as { nombre: string; stock: number };
          const productId = NOMBRE_TO_ID[nombre];
          if (productId) {
            setProducts((prev) =>
              prev.map((p) => (p.id === productId ? { ...p, stock } : p)),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const fresh = products.find((p) => p.id === selectedProduct.id);
      if (fresh && fresh.stock !== selectedProduct.stock) {
        setSelectedProduct(fresh);
      }
    }
  }, [products, selectedProduct]);

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
      setIsNextDispatch(true);
      setScreen('detail');
    }
  }, [outOfStockProduct]);

  const handleBackToCatalog = useCallback(() => {
    setSelectedProduct(null);
    setShowPurchasePanel(false);
    setPurchaseStep(1);
    setIsNextDispatch(false);
    setOrderData({
      size: null, grindType: null, quantity: 1,
      city: '', address: '', neighborhood: '', details: '',
      paymentMethod: null,
    });
    setScreen('catalog');
  }, []);

  const handleLogoClick = useCallback(() => {
    setSelectedProduct(null);
    setShowPurchasePanel(false);
    setPurchaseStep(1);
    setIsNextDispatch(false);
    setOrderData({
      size: null, grindType: null, quantity: 1,
      city: '', address: '', neighborhood: '', details: '',
      paymentMethod: null,
    });
    setScreen('intro');
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
    const dispatchHeader = isNextDispatch
      ? `🗓️ PEDIDO PRÓXIMO DESPACHO\n📅 Entrega estimada: ${getNextDispatchDate()}\n\n`
      : '';
    const message = encodeURIComponent(
      `Hola! 👋 Quiero confirmar mi pedido de QUÉ NOTA:\n\n` +
      dispatchHeader +
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
      {screen === 'success' && (
        <SuccessScreen logo={imgBrand} />
      )}

      {screen === 'intro' && (
        <IntroScreen logo={imgBrand} onComplete={handleIntroComplete} />
      )}

      {screen === 'catalog' && (
        <CatalogScreen
          products={products}
          onProductClick={handleProductClick}
          onLogoClick={handleLogoClick}
        />
      )}

      {screen === 'detail' && selectedProduct && (
        <div className="relative">
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToCatalog}
            onStartPurchase={handleStartPurchase}
            onLogoClick={handleLogoClick}
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
