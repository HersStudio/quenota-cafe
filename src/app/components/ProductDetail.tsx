import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '../App';
import imgBrand from '../../assets/237da3dee3ae12b13b13dd5e870e2ac0ba3753ec.png';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onStartPurchase: () => void;
}

function CharacteristicsTable({ product }: { product: Product }) {
  const rows = [
    ['Región', product.characteristics.region],
    ['Altura', product.characteristics.altitude],
    ['Variedad', product.characteristics.variety],
    ['Procesamiento', product.characteristics.processing],
    ['Perfil Sensorial', product.characteristics.sensoryProfile],
    ['Acidez', product.characteristics.acidity],
    ['Puntaje Catador', product.characteristics.cuppingScore],
  ];

  return (
    <div className="border rounded-[8px] overflow-hidden" style={{ borderColor: '#C86A3A' }}>
      {rows.map(([label, value], i) => (
        <div
          key={label}
          className={`flex items-center justify-between px-4 py-3 ${i < rows.length - 1 ? 'border-b' : ''}`}
          style={{ borderColor: '#C86A3A' }}
        >
          <span className="text-[14px] font-bold" style={{ color: '#1E1E1E' }}>{label}</span>
          <span className="text-[14px]" style={{ color: '#6A7282' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function InfoSection() {
  const items = [
    { icon: 'calendar', label: 'Pedidos', value: 'Lunes a Miércoles' },
    { icon: 'truck', label: 'Entregas', value: 'Solo en Barranquilla' },
    { icon: 'box', label: 'Despachos', value: 'Todos los viernes' },
  ];

  return (
    <div className="border rounded-[8px] p-4 space-y-3" style={{ borderColor: '#1E1E1E' }}>
      <h3 className="text-[16px] font-bold" style={{ color: '#1E1E1E' }}>Ten en cuenta</h3>
      {items.map(({ icon, label, value }) => (
        <div key={label} className="flex items-center gap-3">
          {icon === 'calendar' && (
            <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 18 18">
              <path d="M5.25 1.5V3.75M12.75 1.5V3.75" stroke="#B75929" strokeLinecap="square" strokeWidth="1.67" />
              <path d="M15.75 3H2.25V16.5H15.75V3Z" stroke="#B75929" strokeLinecap="square" strokeWidth="1.25" />
              <path d="M2.25 7.5H15.75" stroke="#B75929" strokeLinecap="square" strokeWidth="1.25" />
            </svg>
          )}
          {icon === 'truck' && (
            <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 18 18">
              <path d="M9 9.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" stroke="#B75929" strokeWidth="1.25" />
              <path d="M14.25 7.5c0 4.5-5.25 8.25-5.25 8.25S3.75 12 3.75 7.5a5.25 5.25 0 0110.5 0z" stroke="#B75929" strokeWidth="1.25" />
            </svg>
          )}
          {icon === 'box' && (
            <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24">
              <path d="M1 8h11v8H1V8z" stroke="#B75929" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 8h4l3 3v5h-7V8z" stroke="#B75929" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="5.5" cy="18.5" r="2" stroke="#B75929" strokeWidth="1.5" />
              <circle cx="16.5" cy="18.5" r="2" stroke="#B75929" strokeWidth="1.5" />
            </svg>
          )}
          <p className="text-[14px]" style={{ color: '#1E1E1E' }}>
            <span className="font-bold">{label}:</span> {value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ProductDetail({ product, onBack, onStartPurchase }: ProductDetailProps) {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: '#F2E8E0' }}>
      {/* Header */}
      <header className="border-b lg:block" style={{ borderColor: '#C86A3A' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-5 lg:py-6 flex justify-center">
          <img src={imgBrand} alt="Qué Nota Café" className="h-[38px] lg:h-[46px] object-contain" />
        </div>
      </header>

      {/* Desktop: 50/50 layout */}
      <div className="max-w-[1200px] mx-auto">
        <div className="lg:grid lg:grid-cols-2 min-h-[calc(100dvh-80px)]">
          {/* Left: Image */}
          <div className="relative h-[300px] lg:h-auto lg:min-h-[calc(100dvh-80px)]" style={{ backgroundColor: '#1E1E1E' }}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block text-[12px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#1E1E1E', color: '#34c759' }}>
                {product.stock > 0 ? `Quedan ${product.stock} Und` : 'Sin stock'}
              </span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="px-6 lg:px-10 py-8 lg:py-10 overflow-y-auto" style={{ backgroundColor: '#F2E8E0' }}>
            {product.isSpecialEdition && (
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] mb-2" style={{ color: '#C86A3A' }}>
                {product.subtitle}
              </p>
            )}

            <h1 className="text-[30px] lg:text-[36px] font-bold leading-[36px] lg:leading-[40px] mb-4" style={{ color: '#1E1E1E' }}>
              {product.name}
            </h1>

            <p className="text-[16px] leading-[24px] mb-8" style={{ color: '#6A7282' }}>
              {product.description}
            </p>

            <CharacteristicsTable product={product} />

            <div className="mt-8">
              <InfoSection />
            </div>

            {/* CTAs */}
            <div className="flex gap-4 mt-8 pb-8">
              <button
                onClick={onBack}
                className="flex-1 text-[14px] font-bold uppercase tracking-[0.05em] py-4 rounded-[8px] border-2 transition-colors"
                style={{ borderColor: '#1E1E1E', color: '#1E1E1E', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1E1E1E'; e.currentTarget.style.color = '#F2E8E0'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1E1E1E'; }}
              >
                REGRESAR
              </button>
              <button
                onClick={onStartPurchase}
                className="flex-1 text-[14px] font-bold uppercase tracking-[0.05em] py-4 rounded-[8px] transition-colors"
                style={{ backgroundColor: '#C86A3A', color: '#F2E8E0' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E1E1E')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C86A3A')}
              >
                QUIERO PROBARLO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
