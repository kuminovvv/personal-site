import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
  prefetch?: boolean;
};

const Link = (props: LinkProps) => {
  const { href, children, prefetch: _prefetch, ...restProps } = props;

  return (
    <a href={href} {...restProps}>
      {children}
    </a>
  );
};

export default Link;
