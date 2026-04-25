import React from 'react';
import { X } from 'lucide-react';

interface OutOfStockModalProps {
  onClose: () => void;
  onOrder: () => void;
}

export default function OutOfStockModal({ onClose, onOrder }: OutOfStockModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-[480px] rounded-[16px] p-8 lg:p-10"
        style={{ backgroundColor: '#F2E8E0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" style={{ color: '#1E1E1E' }} />
        </button>

        <h2 className="text-[24px] lg:text-[30px] font-bold leading-[32px] lg:leading-[36px] mb-4" style={{ color: '#1E1E1E' }}>
          Se nos fue volando, pero puedes pedirlo.
        </h2>

        <p className="text-[16px] leading-[24px] mb-8" style={{ color: '#6A7282' }}>
          Este café se agotó, pero puedes pedirlo ahora y te lo entregamos en el próximo despacho (viernes o sábado).
        </p>

        <button
          onClick={onOrder}
          className="w-full text-[14px] font-bold uppercase tracking-[0.05em] py-4 rounded-[8px] transition-colors"
          style={{ backgroundColor: '#C86A3A', color: '#F2E8E0' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E1E1E')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C86A3A')}
        >
          PEDIR PARA EL PRÓXIMO DESPACHO
        </button>
      </div>
    </div>
  );
}
