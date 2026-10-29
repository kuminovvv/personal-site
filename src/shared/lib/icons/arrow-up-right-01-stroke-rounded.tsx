import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

// Source: Hugeicons Free Stroke Rounded (MIT), https://hugeicons.com/icons
export const ArrowUpRight01StrokeRoundedIcon = (props: IconProps) => {
  const {
    size = 24,
    width,
    height,
    color = "currentColor",
    strokeWidth = 1.5,
    ...svgProps
  } = props;
  return (
  <svg
    width={width ?? size}
    height={height ?? size}
    viewBox="0 0 24 24"
    fill="none"
    color={color}
    strokeWidth={strokeWidth}
    xmlns="http://www.w3.org/2000/svg"
    {...svgProps}
  >
    <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  );
};
