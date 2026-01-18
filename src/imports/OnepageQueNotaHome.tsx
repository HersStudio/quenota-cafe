import svgPaths from "./svg-eibklslmad";
import clsx from "clsx";
import imgBrand from "figma:asset/965f050b21f22d942aec90675ac7589cde10f869.png";
import imgRectangle1 from "figma:asset/1a31ae0403fa4c82d521a75f8d733a675a23f6b0.png";
type LevelsHelperProps = {
  additionalClassNames?: string;
};

function LevelsHelper({ children, additionalClassNames = "" }: React.PropsWithChildren<LevelsHelperProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(30, 30, 30, 1)" } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        {children}
      </svg>
    </div>
  );
}
type HelperProps = {
  text: string;
  text1: string;
};

function Helper({ text, text1 }: HelperProps) {
  return (
    <p className="basis-0 font-['Neuething_Sans:Regular',sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1e1e] text-[0px]">
      <span className="font-['Neuething_Sans:Bold',sans-serif] leading-[20px] text-[14px]">{text}</span>
      <span className="leading-[16px] text-[12px]"></span>
      <span className="leading-[20px] text-[14px]">{text1}</span>
    </p>
  );
}

function Frame1Helper() {
  return (
    <div className="relative shrink-0 size-[8px]">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(183, 89, 41, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <path d={svgPaths.p2e9f1e80} fill="var(--fill-0, #B75929)" id="*" />
        </svg>
      </div>
    </div>
  );
}

export default function OnepageQueNotaHome() {
  return (
    <div className="bg-[#f2e8e0] relative size-full" data-name="Onepage-Qué Nota-home">
      <div className="absolute bg-[#f2e8e0] content-stretch flex flex-col h-[74px] items-center justify-center left-0 top-[62px] w-[390px]" data-name="Header">
        <div className="h-[38.29px] relative shrink-0 w-[200px]" data-name="Brand">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBrand} />
        </div>
      </div>
      <div className="absolute bg-[#f2e8e0] bottom-0 content-stretch flex flex-col gap-[10px] items-center justify-center left-1/2 pb-[32px] pt-[18px] px-[18px] translate-x-[-50%] w-[390px]">
        <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="DSButton_variant">
          <div className="basis-0 bg-[#b75929] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="DSButton_Main">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative w-full">
                <p className="font-['Neuething_Sans:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white">Quiero probarlo</p>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Neuething_Sans:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[0px] text-[12px] text-black text-center text-nowrap">
          <span>{`¿Preguntas? Escríbenos al `}</span>
          <span className="[text-underline-position:from-font] decoration-solid font-['Neuething_Sans:Bold',sans-serif] text-[#1e1e1e] underline">WhatsApp</span>
        </p>
      </div>
      <div className="absolute h-[165px] left-[18px] rounded-[16px] top-[208px] w-[354px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgRectangle1} />
      </div>
      <p className="absolute font-['Neuething_Sans:Bold',sans-serif] leading-[28px] left-[18px] not-italic text-[#c86a3a] text-[20px] text-nowrap top-[389px]">VARIEDAD CHIROSO</p>
      <p className="absolute font-['Neuething_Sans:Regular',sans-serif] leading-[20px] left-[18px] not-italic text-[#1e1e1e] text-[14px] top-[429px] w-[354px]">Café exótico con notas cítricas vibrantes y una acidez sutil que lo hacen único. Cada sorbo revela una complejidad de sabores que evoca las montañas colombianas, donde tradición y pasión por el cultivo se encuentran.</p>
      <div className="absolute font-['Neuething_Sans:Regular','Noto_Sans:Regular',sans-serif] leading-[20px] left-[18px] text-[#1e1e1e] text-[14px] top-[545px] w-[354px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        <p className="mb-0">✓ Acides media</p>
        <p className="mb-0">✓ Tostado artesanal en pequeños lotes</p>
        <p>✓ Frescura garantizada</p>
      </div>
      <div className="absolute content-stretch flex gap-[10px] items-center justify-center left-0 px-[18px] py-[12px] top-[136px] w-[390px]">
        <div aria-hidden="true" className="absolute border-[#c86a3a] border-[1px_0px] border-solid inset-0 pointer-events-none" />
        <Frame1Helper />
        <p className="font-['Neuething_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">Del grano a tu taza, con sabor que se nota</p>
        <Frame1Helper />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[12px] items-start justify-center left-1/2 p-[12px] rounded-[8px] top-[629px] translate-x-[-50%] w-[354px]" data-name="button_select">
        <div aria-hidden="true" className="absolute border border-[#1e1e1e] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
          <Wrapper>
            <g id="location-01">
              <path d={svgPaths.p3558ea00} id="Vector" stroke="var(--stroke-0, #B75929)" strokeWidth="1.25" />
              <path d={svgPaths.p2b824200} id="Vector_2" stroke="var(--stroke-0, #B75929)" strokeWidth="1.25" />
            </g>
          </Wrapper>
          <Helper text="Domicilios:" text1="Solo en Barranquilla" />
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
          <Wrapper>
            <g id="calendar-03">
              <path d={svgPaths.p4c79270} id="Vector" stroke="var(--stroke-0, #B75929)" strokeLinecap="square" strokeWidth="1.66667" />
              <path d={svgPaths.p35dc0400} id="Vector_2" stroke="var(--stroke-0, #B75929)" strokeLinecap="square" strokeWidth="1.25" />
              <path d="M15.75 3H2.25V16.5H15.75V3Z" id="Vector_3" stroke="var(--stroke-0, #B75929)" strokeLinecap="square" strokeWidth="1.25" />
              <path d="M2.25 7.5H15.75" id="Vector_4" stroke="var(--stroke-0, #B75929)" strokeLinecap="square" strokeWidth="1.25" />
            </g>
          </Wrapper>
          <p className="basis-0 font-['Neuething_Sans:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1e1e] text-[0px] text-[14px]">
            <span className="font-['Neuething_Sans:Bold',sans-serif]">Recibimos pedidos:</span>
            <span>{` Lunes a Miércoles`}</span>
          </p>
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
          <Wrapper>
            <g id="truck-delivery">
              <path d={svgPaths.pa40c600} id="Vector" stroke="var(--stroke-0, #B75929)" strokeLinejoin="round" strokeWidth="1.25" />
              <path d={svgPaths.p20a8dc00} id="Vector_2" stroke="var(--stroke-0, #B75929)" strokeLinejoin="round" strokeWidth="1.25" />
              <path d={svgPaths.p300f4200} id="Vector_3" stroke="var(--stroke-0, #B75929)" strokeLinejoin="round" strokeWidth="1.25" />
              <path d="M1.5 6H6" id="Vector_4" stroke="var(--stroke-0, #B75929)" strokeLinejoin="round" strokeWidth="1.25" />
              <path d="M1.5 8.25H4.5" id="Vector_5" stroke="var(--stroke-0, #B75929)" strokeLinejoin="round" strokeWidth="1.25" />
              <path d={svgPaths.p22e36280} id="Vector_6" stroke="var(--stroke-0, #B75929)" strokeLinejoin="round" strokeWidth="1.25" />
            </g>
          </Wrapper>
          <Helper text="Despachamos:" text1="Todos los viernes" />
        </div>
      </div>
      <div className="absolute bg-[#1e1e1e] content-stretch flex gap-[4px] items-center justify-center left-[30px] px-[8px] py-[4px] rounded-[6px] top-[220px]" data-name="Badge">
        <p className="font-['Neuething_Sans:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#34c759] text-[12px] text-nowrap">¡Pedidos abiertos!</p>
      </div>
      <div className="absolute bg-[#f2e8e0] content-stretch flex gap-[4px] items-center justify-center left-[calc(50%+67px)] px-[8px] py-[4px] rounded-[6px] top-[391px]" data-name="Badge">
        <div aria-hidden="true" className="absolute border border-[#b75929] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <p className="font-['Neuething_Sans:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1e1e1e] text-[12px] text-nowrap">Quedan 24 Und</p>
      </div>
      <div className="absolute bg-[#f2e8e0] content-stretch flex gap-[154px] items-center justify-center left-1/2 pb-[19px] pt-[21px] px-[24px] top-0 translate-x-[-50%] w-[390px]" data-name="Status bar - iPhone">
        <div className="basis-0 content-stretch flex grow h-[22px] items-center justify-center min-h-px min-w-px pb-0 pt-[1.5px] px-0 relative shrink-0" data-name="Time">
          <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[#1e1e1e] text-[17px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            9:41
          </p>
        </div>
        <div className="basis-0 grow h-[22px] min-h-px min-w-px relative shrink-0" data-name="Levels">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[7px] items-center justify-center pb-0 pl-0 pr-px pt-px relative size-full">
              <LevelsHelper additionalClassNames="h-[12.226px] w-[19.2px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2 12.2264">
                  <path clipRule="evenodd" d={svgPaths.p1e09e400} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Cellular Connection" />
                </svg>
              </LevelsHelper>
              <LevelsHelper additionalClassNames="h-[12.328px] w-[17.142px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1417 12.3283">
                  <path clipRule="evenodd" d={svgPaths.p18b35300} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Wifi" />
                </svg>
              </LevelsHelper>
              <div className="h-[13px] relative shrink-0 w-[27.328px]" data-name="Frame">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.328 13">
                  <g id="Frame">
                    <rect height="12" id="Border" opacity="0.35" rx="3.8" stroke="var(--stroke-0, #1E1E1E)" width="24" x="0.5" y="0.5" />
                    <path d={svgPaths.p7a14d80} fill="var(--fill-0, #1E1E1E)" id="Cap" opacity="0.4" />
                    <rect fill="var(--fill-0, #1E1E1E)" height="9" id="Capacity" rx="2.5" width="21" x="2" y="2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}