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
        className="inline-block text-[13px] font-bold px-3 py-[5px] border"
        style={{ borderColor: '#D1D5DC', color: '#6A7282' }}
      >
        Sin stock
      </span>
    );
  }
  return (
    <span
      className="inline-block text-[13px] font-bold px-3 py-[5px] border"
      style={{ borderColor: '#1E1E1E', color: '#1E1E1E' }}
    >
      Quedan {stock} Und
    </span>
  );
}

function SpecialEditionSeal() {
  return (
    <div className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 lg:-left-12">
      <div className="animate-spin-slow w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]">
        <svg viewBox="0 0 150 150" className="w-full h-full">
          <defs>
            <path
              id="sealCircle"
              d="M 75,75 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
            />
          </defs>
          {/* Outer ring text */}
          <text
            fill="#C86A3A"
            fontSize="12"
            fontWeight="700"
            letterSpacing="3.5"
            textAnchor="middle"
          >
            <textPath href="#sealCircle" startOffset="50%">
              TEMPORADA EDICIÓN ESPECIAL DE
            </textPath>
          </text>
          {/* Center asterisk */}
          <text
            x="75"
            y="85"
            textAnchor="middle"
            fontSize="48"
            fontWeight="900"
            fill="#2ECDA7"
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
    <div className="absolute -right-6 bottom-4 z-0 w-[100px] h-[120px] lg:w-[120px] lg:h-[140px] pointer-events-none">
      <svg viewBox="0 0 120 140" fill="none" className="w-full h-full">
        <path
          d="M60 0C90 0 120 30 120 70C120 110 90 140 60 140C30 140 0 110 0 80C0 50 30 0 60 0Z"
          fill="#C86A3A"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

function ProductCard({
  product,
  onClick,
  index,
}: {
  product: Product;
  onClick: () => void;
  index: number;
}) {
  const formatPrice = (price: number) => {
    return '$' + price.toLocaleString('es-CO');
  };

  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      {/* Special edition seal - only on first product if applicable */}
      {product.isSpecialEdition && <SpecialEditionSeal />}

      {/* Decorative blob on non-special products */}
      {!product.isSpecialEdition && <DecorativeBlob />}

      {/* Product image */}
      <div
        className="relative overflow-hidden mb-5 aspect-[4/5]"
        style={{ backgroundColor: '#1E1E1E' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          style={{ opacity: product.stock <= 0 ? 0.5 : 1 }}
        />
      </div>

      {/* Badge below image */}
      <div className="mb-3">
        <StockBadge stock={product.stock} />
      </div>

      {/* Product name */}
      <h3
        className="text-[22px] lg:text-[26px] font-bold leading-[28px] lg:leading-[32px] mb-1"
        style={{ color: '#1E1E1E' }}
      >
        {product.name}
      </h3>

      {/* Origin */}
      <p className="text-[15px] mb-3" style={{ color: '#6A7282' }}>
        {product.origin}
      </p>

      {/* Price + Arrow row */}
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
          className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
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

      {/* Bottom line */}
      <div className="h-[2px]" style={{ backgroundColor: '#C86A3A' }} />
    </div>
  );
}

export default function CatalogScreen({
  products,
  onProductClick,
}: CatalogScreenProps) {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: '#F2E8E0' }}>
      {/* Header */}
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

      {/* Product grid */}
      <main className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-4 lg:pt-8 pb-16 lg:pb-24">
        <div
          className={`grid gap-10 lg:gap-14 ${
            products.length === 1
              ? 'grid-cols-1 max-w-[560px]'
              : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              index={i}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
