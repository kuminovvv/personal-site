import type { ReactNode } from "react";

type SiteLayoutProps = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

export const SiteLayout = (props: SiteLayoutProps) => {
  const {
    children,
    header,
    footer,
  } = props;

  return (
    <div id="top" data-site-layout className="flow-root min-h-screen bg-site-canvas font-sans text-site-text">
      {header}
      <main className="mx-auto w-[calc(100%-40px)] max-w-340 max-[900px]:w-[calc(100%-32px)] max-[680px]:w-[calc(100%-24px)] [&_[id]]:scroll-mt-30 max-[680px]:[&_[id]]:scroll-mt-26">{children}</main>
      {footer}
    </div>
  );
};
