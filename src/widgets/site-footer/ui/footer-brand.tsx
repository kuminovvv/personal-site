import type { SiteContent } from "@/shared/lib/content/get-site-content";

type FooterBrandProps = { content: SiteContent["footer"]; };

export const FooterBrand = (props: FooterBrandProps) => {
  const {
    content,
  } = props;
  return (
<div className="max-[850px]:col-span-2 max-[580px]:col-span-1">
          <div className="flex items-center gap-2">
            <strong className="grid size-15.5 place-items-center rounded-[17px] bg-site-green font-heading text-[27px] font-black text-site-contact-accent">K.</strong>
            <span className="grid gap-0.75">
              <b className="font-heading text-[29px] font-bold max-[580px]:text-[22px]">{content.brand}</b>
              <small className="text-[13px] text-site-contact-text">{content.subtitle}</small>
            </span>
          </div>
          <p className="my-4 text-[16px] text-site-contact-text">{content.description}</p>
          <span className="inline-block rounded-full bg-site-footer-surface-b px-3.75 py-3 text-[11px] text-white">{content.tag}</span>
        </div>
  );
};
