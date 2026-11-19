import Image from "next/image";

type HeroVisualCardProps = {
  portraitSrc: string;
  portraitAlt: string;
  brand: string;
  brandDescription: string;
  brandCategory: string;
  brandSince: string;
};

export const HeroVisualCard = (props: HeroVisualCardProps) => {
  const {
    portraitSrc,
    portraitAlt,
    brand,
    brandDescription,
    brandCategory,
    brandSince,
  } = props;
  return (
    <div className="min-w-0 overflow-hidden rounded-[30px] bg-site-surface max-[680px]:max-w-125">
      <Image className="block aspect-1448/1086 h-auto w-full rounded-[30px] object-cover" src={portraitSrc} alt={portraitAlt} width={1448} height={1086} priority />
      <div className="flex min-h-50.75 flex-col justify-between p-10 max-[1180px]:min-h-45 max-[1180px]:p-7 max-[900px]:min-h-37.5 max-[900px]:p-5 [&_strong]:font-heading [&_strong]:text-[clamp(27px,2.5vw,39px)] [&_strong]:font-black [&_strong]:tracking-tighter [&_p]:mt-3 [&_p]:text-[18px] [&_p]:text-site-subtle">
        <div><strong>{brand}</strong><p>{brandDescription}</p></div>
        <div className="flex items-center justify-between gap-2.5 max-[400px]:flex-wrap [&_span]:whitespace-nowrap [&_span]:rounded-full [&_span]:bg-site-soft [&_span]:px-5.5 [&_span]:py-3 [&_span]:text-[13px] [&_span]:font-semibold max-[900px]:[&_span]:min-w-0 max-[900px]:[&_span]:px-3 max-[900px]:[&_span]:py-2.25 max-[900px]:[&_span]:text-[10px] [&_span:first-child]:min-w-58 [&_span:first-child]:text-center max-[900px]:[&_span:first-child]:min-w-0"><span>{brandCategory}</span><span>{brandSince}</span></div>
      </div>
    </div>
  );
};
