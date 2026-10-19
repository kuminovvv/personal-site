import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number | string };

// Source: Hugeicons Free Stroke Rounded (MIT), https://hugeicons.com/icons
export const ArrowRight02StrokeRoundedIcon = ({ size = 24, width, height, color = "currentColor", strokeWidth = 1.5, ...props }: Props) => (
  <svg
    width={width ?? size}
    height={height ?? size}
    viewBox="0 0 24 24"
    fill="none"
    color={color}
    strokeWidth={strokeWidth}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.5 12L4.99997 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
