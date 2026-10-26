import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualText } from "../model/locale-content";

export const Approach = ({ locale = "ru" }: { locale?: Locale }) => {
  const copy = getVisualText(locale);
  return (
  <section id="approach" className="text-[#0a0a0a]">
    <div className="mb-[63px] flex justify-between gap-4 font-[family-name:var(--font-visual-mono)] text-[14px] leading-[1.1] tracking-[.006em] text-[#5d625e]"><span>{copy.approach}</span><span>ENGINEERING × DESIGN</span></div>
    <h2 data-motion="heading" className="mb-[62px] text-[clamp(48px,6vw,112px)] leading-[1.01] font-semibold tracking-[-.04em]">{copy.approachTitle}</h2>
    <div className="grid grid-cols-[1.42fr_1fr] gap-8 min-[1600px]:min-h-[588px] max-[850px]:grid-cols-1">
      <div data-motion="panel" className="rounded-[48px] bg-[#e6efe8] p-8 max-[520px]:rounded-[26px] max-[520px]:p-5">
        <div className="flex justify-between gap-4 font-[family-name:var(--font-visual-mono)] text-[13px] leading-none text-[#496a54]"><span>KUMINOVVV / SYSTEM THINKING</span><span>01—03</span></div>
        <h3 className="mt-[29px] mb-[29px] text-[clamp(42px,4vw,73px)] leading-[.97] font-semibold tracking-[-.035em] text-[#19392f] max-[375px]:text-[35px]">{copy.interfaceTitle[0]}<br />{copy.interfaceTitle[1]}</h3>
        <div className="rounded-[18px] bg-white p-5">
          <div className="mb-5 flex justify-between gap-2 border-b border-[#e8e8e8] pb-5 font-[family-name:var(--font-visual-mono)] text-[12px] text-[#596d60]"><span>{copy.model}</span><span>THINK → DESIGN → BUILD</span></div>
          <div className="grid grid-cols-3 gap-2 max-[490px]:grid-cols-1">
            {copy.modelValues.map((name,index)=><div key={name} data-motion="diagram" data-motion-order={index + 2} className="flex min-h-32 flex-col gap-3 rounded-xl p-4" style={{background:["#213b32","#d7e7dc","#a9ef92"][index],color:["#f4fff5","#17382c","#153c26"][index]}}><span className="font-mono text-xs">0{index + 1}</span><strong className="text-[clamp(12px,1.3vw,21px)]">{name}</strong><span className="text-xs">{copy.modelDescriptions[index]}</span></div>)}
          </div>
          <p className="mt-5 font-[family-name:var(--font-visual-mono)] text-[12px] text-[#506d59]">{copy.result}</p>
        </div>
        <div className="mt-[29px] flex justify-between gap-3 font-[family-name:var(--font-visual-mono)] text-[12px] leading-none text-[#496a54]"><span>REACT / TYPESCRIPT / FSD</span><span>ENGINEERED WITH INTENT</span></div>
      </div>
      <div className="flex flex-col justify-around gap-8">
        {copy.side.map(([category,title],index)=><div key={category} data-motion="fade" data-motion-order={index + 1} className="border-b border-[#e8e8e8] pb-8"><div className="mb-4 flex justify-between font-[family-name:var(--font-visual-mono)] text-[14px] text-[#5d675f]"><span>0{index + 1}</span><span className="text-[13px] tracking-[.008em]">{category}</span></div><p className="font-[family-name:var(--visual-heading-font-stack)] text-[clamp(23px,1.51vw,29px)] leading-[1.15] font-semibold tracking-[-.009em]">{title}</p></div>)}
      </div>
    </div>
  </section>
  );
};
