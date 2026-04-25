import React, { useEffect, useState } from 'react';

interface IntroScreenProps {
  logo: string;
  onComplete: () => void;
}

const MARQUEE_TEXT = 'TU TAZA, CON SABOR QUE SE NOTA ✳ CAFÉ 100% COLOMBIANO ✳ SIEMPRE FRESCO ✳ CAFÉ QUE DA GUSTO ✳ DEL GRANO A TU TAZA ✳ ';

export default function IntroScreen({ logo, onComplete }: IntroScreenProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 100);
    const t2 = setTimeout(onComplete, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
      style={{ backgroundColor: '#C86A3A' }}
      onClick={onComplete}
    >
      <div className="flex-1 flex items-center justify-center">
        <img
          src={logo}
          alt="Qué Nota Café"
          className="w-[280px] lg:w-[400px] transition-all ease-out"
          style={{
            filter: 'brightness(0) invert(1)',
            opacity: show ? 1 : 0,
            transform: show ? 'scale(1)' : 'scale(0.8)',
            transitionDuration: '800ms',
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-6">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="text-[14px] lg:text-[16px] font-semibold tracking-[0.05em] mx-0"
              style={{ color: '#F2E8E0' }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
