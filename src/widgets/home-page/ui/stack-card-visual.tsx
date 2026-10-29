import { homeAssetPath } from "../model/assets";
import Image from "next/image";
import { Tick01StrokeRoundedIcon } from "@/shared/lib/icons";



export const StackCardVisual = (props: { id: string }) => {
  const {
    id,
  } = props;
  if (id === "interfaces") return <div className="grid h-26.25 content-center gap-1.5 overflow-hidden rounded-xl bg-site-soft p-3 [&>div]:flex [&>div]:gap-2 [&_i]:h-1.5 [&_i]:w-1/4 [&_i]:rounded [&_i]:bg-site-mini-window-surface-c [&_img]:h-auto [&_img]:max-h-5.25 [&_img]:w-full"><div><i /><i /><i /></div><Image src={homeAssetPath + "stack-architecture-0.svg"} alt="" width={329} height={21} /><Image src={homeAssetPath + "stack-architecture-1.svg"} alt="" width={329} height={21} /></div>;
  if (id === "architecture") return <div className="flex h-26.25 items-center justify-between gap-2 overflow-hidden rounded-xl bg-site-soft p-3 [&>span]:flex [&>span]:h-16.5 [&>span]:w-[32%] [&>span]:flex-col [&>span]:items-center [&>span]:justify-center [&>span]:gap-2 [&>span]:rounded-[9px] [&>span]:bg-site-surface [&>span]:text-[11px] [&>span]:font-semibold [&>span:nth-child(2)]:bg-site-sage"><span>UI</span><span>FEATURE</span><span>API</span></div>;
  if (id === "quality") return <div className="grid h-26.25 content-center gap-1.5 overflow-hidden rounded-xl bg-site-soft p-3 [&_span]:flex [&_span]:rounded-[5px] [&_span]:bg-site-surface [&_span]:px-2 [&_span]:py-1 [&_span]:text-[11px] [&_span]:text-site-green-text dark:text-site-green">{["━━━━━━━━━━", "━━━━━━━━", "━━━━━━━━━"].map((line) => <span key={line} className="flex items-center gap-2"><Tick01StrokeRoundedIcon aria-hidden="true" size={14} />{line}</span>)}</div>;
  return <div className="flex h-26.25 items-center justify-between gap-2 overflow-hidden rounded-xl bg-site-soft p-3 [&>span]:flex [&>span]:h-16.5 [&>span]:w-[32%] [&>span]:flex-col [&>span]:items-center [&>span]:justify-center [&>span]:gap-2 [&>span]:rounded-[9px] [&>span]:bg-site-surface [&>span]:text-[11px] [&>span]:font-semibold [&>span:nth-child(2)]:bg-site-sage"><span><span aria-hidden="true" className="size-3.75 shrink-0 rounded-full bg-site-stack-surface" />UI</span><span><span aria-hidden="true" className="size-3.75 shrink-0 rounded-full bg-site-green" />API</span><span>DB</span></div>;
};
