import React from 'react';
import logoImage from 'figma:asset/48d35b88371fe77b2028f3232252ef90ea3cb3d4.png';

export function Header() {
  return (
    <header className="w-full bg-white border-b-2 border-gray-300 py-4 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left text */}
        <div className="flex-1 text-left">
          <p className="text-sm md:text-base font-semibold text-gray-700">
            100% colombiano
          </p>
        </div>

        {/* Center logo */}
        <div className="flex-shrink-0">
          <img 
            src={logoImage} 
            alt="Qué Nota" 
            className="h-8 md:h-12 w-auto"
          />
        </div>

        {/* Right text */}
        <div className="flex-1 text-right">
          <p className="text-sm md:text-base font-semibold text-gray-700">
            Café que da gusto
          </p>
        </div>
      </div>
    </header>
  );
}
