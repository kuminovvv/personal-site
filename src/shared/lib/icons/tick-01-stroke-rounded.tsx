import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

// Source: Hugeicons Free Stroke Rounded (MIT), https://hugeicons.com/icons
export const Tick01StrokeRoundedIcon = (props: IconProps) => {
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
    <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  );
};
