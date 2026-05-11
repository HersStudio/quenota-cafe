import React, { useEffect, useState } from 'react';

interface IntroScreenProps {
  logo: string;
  onComplete: () => void;
}

const MARQUEE_SEGMENT = 'TU TAZA, CON SABOR QUE SE NOTA  ✳  CAFÉ 100% COLOMBIANO  ✳  SIEMPRE FRESCO  ✳  CAFÉ QUE DA GUSTO  ✳  DEL GRANO A TU TAZA  ✳  ';

const BG_IMAGES = [
  '/images/intro-bg-1.jpg',
  '/images/intro-bg-2.jpg',
  '/images/intro-bg-3.jpg',
];

export default function IntroScreen({ logo, onComplete }: IntroScreenProps) {
  const [visible, setVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showTerracotta, setShowTerracotta] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setVisible(true), 50);
    const t1 = setTimeout(() => setActiveSlide(1), 1000);
    const t2 = setTimeout(() => setActiveSlide(2), 2000);
    const t3 = setTimeout(() => setShowTerracotta(true), 3000);
    const tEnd = setTimeout(onComplete, 4000);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col cursor-pointer"
      style={{ backgroundColor: '#C86A3A' }}
      onClick={onComplete}
    >
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        {BG_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              opacity: !showTerracotta && activeSlide === i ? 1 : 0,
              transition: 'opacity 1000ms ease-in-out',
            }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Logo + tagline centered */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div
          className="flex flex-col items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.85)',
            transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <img
            src={logo}
            alt="Qué Nota Café"
            className="w-[320px] lg:w-[480px]"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <p
            className="text-[16px] lg:text-[18px] mt-2 tracking-[0.02em]"
            style={{ color: '#F2E8E0' }}
          >
            Café que da gusto
          </p>
        </div>
      </div>

      {/* Marquee bar */}
      <div
        className="relative z-10 w-full overflow-hidden"
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
