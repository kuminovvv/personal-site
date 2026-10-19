type CatalogSectionHeadingProps = {
  title: string;
  meta: string;
  className?: string;
};

export const CatalogSectionHeading = ({ title, meta, className = "" }: CatalogSectionHeadingProps) => (
  <div className={`flex min-h-16.5 items-center justify-between gap-4 rounded-full bg-site-surface p-4 max-[680px]:items-start max-[680px]:rounded-site-24 max-[400px]:flex-wrap max-[400px]:gap-2 ${className}`}>
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-site-green" />
      <h2 className="font-sans text-[19px] leading-[1.2] font-bold tracking-normal max-[680px]:text-[16px]">{title}</h2>
    </div>
    <span className="text-[12px] text-site-subtle whitespace-nowrap max-[680px]:text-[10px]">{meta}</span>
  </div>
);
