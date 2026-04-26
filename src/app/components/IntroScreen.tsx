import React, { useEffect, useState } from 'react';

interface IntroScreenProps {
  logo: string;
  onComplete: () => void;
}

const MARQUEE_SEGMENT = 'TU TAZA, CON SABOR QUE SE NOTA  ✳  CAFÉ 100% COLOMBIANO  ✳  SIEMPRE FRESCO  ✳  CAFÉ QUE DA GUSTO  ✳  DEL GRANO A TU TAZA  ✳  ';

export default function IntroScreen({ logo, onComplete }: IntroScreenProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(onComplete, 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col cursor-pointer"
      style={{ backgroundColor: '#C86A3A' }}
      onClick={onComplete}
    >
      {/* Logo centered */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={logo}
          alt="Qué Nota Café"
          className="w-[320px] lg:w-[480px]"
          style={{
            filter: 'brightness(0) invert(1)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.85)',
            transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>

      {/* Marquee bar */}
      <div
        className="w-full overflow-hidden"
        style={{ backgroundColor: '#1E1E1E' }}
      >
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-[13px] lg:text-[14px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: '#F2E8E0' }}
            >
              {MARQUEE_SEGMENT}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
