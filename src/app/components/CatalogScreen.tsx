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
      <span className="inline-block text-[12px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#D1D5DC', color: '#6A7282' }}>
        Sin stock
      </span>
    );
  }
  return (
    <span className="inline-block text-[12px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#1E1E1E', color: '#34c759' }}>
      Quedan {stock} Und
    </span>
  );
}

function SpecialEditionSeal() {
  return (
    <div className="absolute -top-2 -right-2 lg:top-4 lg:right-4 z-10">
      <div className="animate-spin-slow w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
          </defs>
          <circle cx="50" cy="50" r="46" fill="#1E1E1E" />
          <text fill="#F2E8E0" fontSize="8.5" fontWeight="700" letterSpacing="1.5">
            <textPath href="#circlePath" startOffset="0%">
              ✳ EDICIÓN ESPECIAL DE TEMPORADA ✳ EDICIÓN ESPECIAL
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <div
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      {product.isSpecialEdition && <SpecialEditionSeal />}

      <div className="relative overflow-hidden rounded-[16px] mb-4 aspect-[4/5]" style={{ backgroundColor: '#1E1E1E' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ opacity: product.stock <= 0 ? 0.5 : 1 }}
        />
        <div className="absolute top-4 left-4">
          <StockBadge stock={product.stock} />
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]" style={{ color: '#1E1E1E' }}>
            {product.name}
          </h3>
          {product.isSpecialEdition && (
            <p className="text-[12px] font-semibold mt-1" style={{ color: '#C86A3A' }}>
              {product.subtitle}
            </p>
          )}
        </div>

        <button
          className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
          style={{ backgroundColor: '#C86A3A' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E1E1E')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C86A3A')}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          aria-label={`Ver ${product.name}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="#F2E8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function CatalogScreen({ products, onProductClick }: CatalogScreenProps) {
  return (
    <div className="min-h-dvh" style={{ backgroundColor: '#F2E8E0' }}>
      <header className="border-b" style={{ borderColor: '#C86A3A' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-5 lg:py-6 flex justify-center">
          <img src={imgBrand} alt="Qué Nota Café" className="h-[38px] lg:h-[46px] object-contain" />
        </div>
      </header>

      <div className="hidden lg:flex items-center justify-center gap-[10px] px-8 py-3 border-b" style={{ borderColor: '#C86A3A' }}>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#B75929' }} />
        <p className="text-[14px]" style={{ color: '#1E1E1E' }}>
          Del grano a tu taza, con sabor que se nota
        </p>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#B75929' }} />
      </div>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8 lg:py-16">
        <h1 className="text-[30px] lg:text-[36px] font-bold mb-2 leading-[36px] lg:leading-[40px]" style={{ color: '#1E1E1E' }}>
          NUESTROS CAFÉS
        </h1>
        <p className="text-[16px] mb-8 lg:mb-12" style={{ color: '#6A7282' }}>
          Café de origen colombiano, tostado artesanal
        </p>

        <div className={`grid gap-8 lg:gap-10 ${products.length === 1 ? 'grid-cols-1 max-w-[480px]' : products.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
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
