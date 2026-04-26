import React from 'react';
import type { Product } from '../App';
import imgBrand from '../../assets/237da3dee3ae12b13b13dd5e870e2ac0ba3753ec.png';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onStartPurchase: () => void;
}

function CharacteristicsTable({ product }: { product: Product }) {
  const rows = [
    ['REGIÓN', product.characteristics.region],
    ['ALTURA', product.characteristics.altitude],
    ['VARIEDAD', product.characteristics.variety],
    ['PROCESAMIENTO', product.characteristics.processing],
    ['PERFIL SENSORIAL', product.characteristics.sensoryProfile],
    ['ACIDEZ', product.characteristics.acidity],
    ['PUNTAJE CATADOR', product.characteristics.cuppingScore],
  ];

  return (
    <div>
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-start justify-between py-4"
          style={{ borderBottom: '2px solid #1E1E1E' }}
        >
          <span
            className="text-[13px] font-bold uppercase tracking-[0.05em] shrink-0 w-[45%]"
            style={{ color: '#1E1E1E' }}
          >
            {label}
          </span>
          <span
            className="text-[14px] text-right uppercase"
            style={{ color: '#1E1E1E' }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

function InfoSection() {
  const items = [
    { icon: 'calendar', label: 'Pedidos', value: 'Lunes a Miércoles' },
    { icon: 'location', label: 'Entregas', value: 'Barranquilla y Soledad' },
    { icon: 'truck', label: 'Despachos', value: 'Viernes y Sábado' },
  ];

  return (
    <div>
      <h2
        className="text-[24px] lg:text-[30px] font-bold uppercase mb-2"
        style={{ color: '#1E1E1E' }}
      >
        TEN EN CUENTA
      </h2>
      <p className="text-[14px] mb-6" style={{ color: '#6A7282' }}>
        Para que tu café llegue fresco y en su mejor punto, trabajamos así:
      </p>

      <div className="space-y-4">
        {items.map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            {icon === 'calendar' && (
              <svg className="w-[20px] h-[20px] shrink-0" fill="none" viewBox="0 0 20 20">
                <path d="M6 1.5V4.5M14 1.5V4.5" stroke="#C86A3A" strokeLinecap="square" strokeWidth="1.5" />
                <rect x="2" y="3.5" width="16" height="15" rx="1" stroke="#C86A3A" strokeWidth="1.5" />
                <path d="M2 8.5H18" stroke="#C86A3A" strokeWidth="1.5" />
              </svg>
            )}
            {icon === 'location' && (
              <svg className="w-[20px] h-[20px] shrink-0" fill="none" viewBox="0 0 20 20">
                <path d="M10 10.75a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#C86A3A" strokeWidth="1.5" />
                <path d="M16 8.5c0 5-6 9.5-6 9.5s-6-4.5-6-9.5a6 6 0 0112 0z" stroke="#C86A3A" strokeWidth="1.5" />
              </svg>
            )}
            {icon === 'truck' && (
              <svg className="w-[20px] h-[20px] shrink-0" fill="none" viewBox="0 0 22 18">
                <path d="M1 3h10v9H1V3z" stroke="#C86A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 6h4l3 3v3h-7V6z" stroke="#C86A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="5" cy="14" r="2" stroke="#C86A3A" strokeWidth="1.5" />
                <circle cx="15" cy="14" r="2" stroke="#C86A3A" strokeWidth="1.5" />
              </svg>
            )}
            <p className="text-[15px]" style={{ color: '#1E1E1E' }}>
              <span className="font-bold">{label}:</span> {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail({ product, onBack, onStartPurchase }: ProductDetailProps) {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: '#F2E8E0' }}>
      <div className="lg:grid lg:grid-cols-2 lg:h-dvh">
        {/* Left: black background, fixed height, image centered */}
        <div className="relative lg:h-dvh" style={{ backgroundColor: '#1E1E1E' }}>
          <div className="absolute top-0 left-0 right-0 z-20 px-6 lg:px-10 py-6 lg:py-8">
            <img
              src={imgBrand}
              alt="Qué Nota Café"
              className="h-[36px] lg:h-[44px] object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          {product.isSpecialEdition && (
            <div className="absolute z-10 top-[15%] right-[5%] lg:top-[12%] lg:right-[8%]">
              <img
                src="/images/sello-edicion-especial-2.png"
                alt="Edición Especial de Temporada"
                className="animate-spin-slow w-[100px] h-[100px] lg:w-[140px] lg:h-[140px]"
              />
            </div>
          )}

          <div className="h-[350px] lg:h-dvh flex items-center justify-center">
            <img
              src="/images/quenotacafe-bourbon-rosado-2.png"
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right: cream content, scrollable, sticky footer */}
        <div
          className="lg:h-dvh lg:overflow-y-auto flex flex-col"
          style={{ backgroundColor: '#F2E8E0' }}
        >
          <div className="px-6 lg:px-10 py-6 lg:py-8 flex items-center justify-end shrink-0">
            <p
              className="text-[14px] font-bold uppercase tracking-[0.1em]"
              style={{ color: '#C86A3A' }}
            >
              CAFÉ FRESCO
            </p>
          </div>

          <div className="flex-1 px-6 lg:px-10">
            <h1
              className="text-[30px] lg:text-[36px] font-bold leading-[36px] lg:leading-[40px] mb-6"
              style={{ color: '#1E1E1E' }}
            >
              {product.name}
            </h1>

            <CharacteristicsTable product={product} />

            <div className="mt-10">
              <InfoSection />
            </div>
          </div>

          {/* Sticky CTA footer */}
          <div
            className="sticky bottom-0 px-6 lg:px-10 py-6 shrink-0"
            style={{ backgroundColor: '#F2E8E0' }}
          >
            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="flex-1 text-[14px] font-bold uppercase tracking-[0.05em] py-4 rounded-full border-2 transition-colors"
                style={{ borderColor: '#1E1E1E', color: '#1E1E1E', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1E1E1E'; e.currentTarget.style.color = '#F2E8E0'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1E1E1E'; }}
              >
                REGRESAR
              </button>
              <button
                onClick={onStartPurchase}
                className="flex-1 text-[14px] font-bold uppercase tracking-[0.05em] py-4 rounded-full transition-colors"
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
