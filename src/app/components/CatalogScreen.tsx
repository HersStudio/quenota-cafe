import React from 'react';
import type { Product } from '../App';
import imgBrand from '../../assets/237da3dee3ae12b13b13dd5e870e2ac0ba3753ec.png';

interface CatalogScreenProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return (
      <span
        className="inline-block text-[13px] font-bold px-3 py-[5px] rounded-[4px]"
        style={{ backgroundColor: '#D1D5DC', color: '#6A7282' }}
      >
        Sin stock
      </span>
    );
  }
  return (
    <span
      className="inline-block text-[13px] font-bold px-3 py-[5px] rounded-[4px]"
      style={{ backgroundColor: '#1E1E1E', color: '#F2E8E0' }}
    >
      Quedan {stock} Und
    </span>
  );
}

function SpecialEditionSeal() {
  return (
    <div className="absolute z-20 -left-[65px] lg:-left-[80px] top-[55%] -translate-y-1/2 pointer-events-none">
      <div className="animate-spin-slow w-[160px] h-[160px] lg:w-[200px] lg:h-[200px]">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            <path
              id="sealTextPath"
              d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            />
          </defs>
          <text
            fill="#C86A3A"
            fontSize="13.5"
            fontWeight="700"
            letterSpacing="2.5"
          >
            <textPath href="#sealTextPath" startOffset="0%">
              TEMPORADA  EDICIÓN  ESPECIAL  DE
            </textPath>
          </text>
          <text
            x="100"
            y="118"
            textAnchor="middle"
            fontSize="72"
            fontWeight="900"
            fill="#00B5A3"
          >
            ✳
          </text>
        </svg>
      </div>
    </div>
  );
}

function DecorativeBlob() {
  return (
    <div className="absolute -right-8 lg:-right-12 top-[25%] z-0 w-[140px] h-[220px] lg:w-[180px] lg:h-[280px] pointer-events-none">
      <svg viewBox="0 0 180 280" fill="none" className="w-full h-full">
        <path
          d="M90 0C140 10 180 60 175 120C170 180 150 210 120 245C95 270 55 280 30 250C5 220 -10 170 10 120C30 70 40 -10 90 0Z"
          fill="#E29E4B"
        />
      </svg>
    </div>
  );
}

function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  const formatPrice = (price: number) => {
    return '$' + price.toLocaleString('es-CO');
  };

  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      {product.isSpecialEdition && <SpecialEditionSeal />}
      {!product.isSpecialEdition && <DecorativeBlob />}

      <div
        className="relative overflow-visible mb-5 aspect-[4/5]"
        style={{ backgroundColor: '#1E1E1E' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="relative z-10 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          style={{ opacity: product.stock <= 0 ? 0.5 : 1 }}
        />
      </div>

      <div className="mb-3">
        <StockBadge stock={product.stock} />
      </div>

      <h3
        className="text-[22px] lg:text-[26px] font-bold leading-[28px] lg:leading-[32px] mb-1"
        style={{ color: '#1E1E1E' }}
      >
        {product.name}
      </h3>

      <p className="text-[15px] mb-3" style={{ color: '#6A7282' }}>
        {product.origin}
      </p>

      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-[13px]" style={{ color: '#6A7282' }}>
            Desde
          </p>
          <p
            className="text-[28px] lg:text-[32px] font-bold leading-[1]"
            style={{ color: '#1E1E1E' }}
          >
            {formatPrice(product.price250)}
          </p>
        </div>

        <button
          className="relative z-10 w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
          style={{ backgroundColor: '#C86A3A' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E1E1E')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C86A3A')}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          aria-label={`Ver ${product.name}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="#F2E8E0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="h-[2px]" style={{ backgroundColor: '#C86A3A' }} />
    </div>
  );
}

export default function CatalogScreen({
  products,
  onProductClick,
}: CatalogScreenProps) {
  return (
    <div className="min-h-dvh overflow-x-hidden" style={{ backgroundColor: '#F2E8E0' }}>
      <header className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6 lg:py-8 flex items-center justify-between">
        <img
          src={imgBrand}
          alt="Qué Nota Café"
          className="h-[36px] lg:h-[44px] object-contain"
        />
        <p
          className="hidden lg:block text-[14px] font-bold uppercase tracking-[0.1em]"
          style={{ color: '#C86A3A' }}
        >
          CAFÉ QUE DA GUSTO
        </p>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-4 lg:pt-8 pb-16 lg:pb-24">
        <div
          className={`grid gap-10 lg:gap-14 ${
            products.length === 1
              ? 'grid-cols-1 max-w-[560px]'
              : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
