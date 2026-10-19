import { LinkButton } from "@/shared/ui/link-button";
import { stackContent } from "../model/stack-content";

export const StackActionBanner = () => {
  const { banner } = stackContent;

  return (
    <section className="flex min-h-30.75 flex-wrap items-center justify-between gap-6 rounded-site-32 bg-[#22272b] p-8 text-white max-[680px]:p-6" aria-label="Перейти к проектам">
      <div className="min-w-0">
        <h2 className="font-heading text-[19px] leading-[1.2] font-bold">{banner.title}</h2>
        <p className="mt-2 text-[13px] text-[#b5bbb7]">{banner.description}</p>
      </div>
      <LinkButton href={banner.href} size="default" arrow="right" className="min-h-12.25 px-6 text-[13px]">
        {banner.label}
      </LinkButton>
    </section>
  );
};
