import React from 'react';
import type { Product } from '../App';
import imgBrand from '../../assets/237da3dee3ae12b13b13dd5e870e2ac0ba3753ec.png';

interface CatalogScreenProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onLogoClick: () => void;
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
    <div className="absolute z-20 -left-[75px] lg:-left-[95px] top-[38%] -translate-y-1/2 pointer-events-none">
      <img
        src="/images/sello-edicion-especial.png"
        alt="Edición Especial de Temporada"
        className="animate-spin-slow w-[170px] h-[170px] lg:w-[210px] lg:h-[210px]"
      />
    </div>
  );
}

function DecorativeBlob() {
  return (
    <div className="absolute -right-20 lg:-right-32 top-[20%] z-0 w-[180px] h-[280px] lg:w-[240px] lg:h-[360px] pointer-events-none">
      <img
        src="/images/decorativo-regional.png"
        alt=""
        className="w-full h-full object-contain"
      />
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
      {product.id === 'regional-del-valle' && <DecorativeBlob />}

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

      <p className="text-[15px] mb-3" style={{ color: '#1E1E1E' }}>
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
  onLogoClick,
}: CatalogScreenProps) {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#F2E8E0' }}>
      <header className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6 lg:py-8 flex items-center justify-between">
        <img
          src={imgBrand}
          alt="Qué Nota Café"
          className="h-[36px] lg:h-[44px] object-contain cursor-pointer"
          onClick={onLogoClick}
        />
        <p
          className="hidden lg:block text-[14px] font-bold uppercase tracking-[0.1em]"
          style={{ color: '#C86A3A' }}
        >
          CAFÉ QUE DA GUSTO
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-8 pt-20 lg:pt-28 pb-8 lg:pb-12">
        <div
          className={`grid gap-10 lg:gap-14 ${
            products.length === 1
              ? 'grid-cols-1 max-w-[560px] mx-auto'
              : 'grid-cols-1 lg:grid-cols-2 max-w-[900px] mx-auto'
          }`}
        >
          {/* Bourbon Rosado oculto temporalmente */}
          {products.filter(p => p.id !== 'bourbon-rosado').map((product) => (
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
