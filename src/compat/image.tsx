import type { CSSProperties } from "react";

type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
  draggable?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  style?: CSSProperties;
};

type Variant = {
  widths: readonly number[];
  sizes: string;
};

const variants: Record<string, Variant> = {
  "/design/home/hero-portrait.webp": {
    widths: [480, 800, 1200],
    sizes: "(max-width: 680px) 100vw, (max-width: 1180px) 50vw, 711px",
  },
  "/design/home/approach-ui.webp": {
    widths: [400, 800],
    sizes: "(max-width: 680px) 100vw, 400px",
  },
  "/design/home/approach-architecture.webp": {
    widths: [400, 800],
    sizes: "(max-width: 680px) 100vw, 400px",
  },
  "/design/home/approach-result.webp": {
    widths: [400, 800],
    sizes: "(max-width: 680px) 100vw, 400px",
  },
};

const buildSrcSet = (src: string, widths: readonly number[], extension: string) =>
  widths
    .map((width) => `${src.replace(/\.webp$/, `-${width}.${extension}`)} ${width}w`)
    .join(", ");

const Image = (props: ImageProps) => {
  const {
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    loading,
    sizes,
    draggable,
    fetchPriority,
    style,
  } = props;
  const variant = variants[src];

  if (!variant) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading ?? (priority ? "eager" : "lazy")}
        fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
        draggable={draggable}
        decoding="async"
        style={style}
      />
    );
  }

  return (
    <picture className="block">
      <source
        type="image/avif"
        srcSet={buildSrcSet(src, variant.widths, "avif")}
        sizes={sizes ?? variant.sizes}
      />
      <source
        type="image/webp"
        srcSet={buildSrcSet(src, variant.widths, "webp")}
        sizes={sizes ?? variant.sizes}
      />
      <img
        src={src.replace(/\.webp$/, "-800.webp")}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading ?? (priority ? "eager" : "lazy")}
        fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
        draggable={draggable}
        decoding="async"
        style={style}
      />
    </picture>
  );
};

export default Image;
