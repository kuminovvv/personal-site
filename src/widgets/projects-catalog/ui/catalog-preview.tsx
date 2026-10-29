import Image from "next/image";

type CatalogPreviewProps = {
  preview: string;
  brand: string;
};

export const CatalogPreview = (props: CatalogPreviewProps) => {
  const {
    preview,
    brand,
  } = props;
  return (
  <div className={`flex h-64 w-43 shrink-0 flex-col items-center gap-4.25 rounded-[15px] px-3.75 pt-5.25 pb-4.25 text-site-mini-window-surface-b max-[450px]:h-52.5 max-[450px]:w-full max-[450px]:flex-row max-[450px]:justify-between max-[450px]:p-4.25 ${preview === "soobota" ? "bg-site-catalog-surface" : preview === "rent" ? "bg-site-catalog-surface-b" : "bg-site-approach-surface"}`} aria-hidden="true">
    <strong className="block w-35 font-heading text-[37px] leading-none font-bold max-[450px]:w-auto max-[450px]:self-start">{brand}</strong>
    <div className={`flex h-28.75 w-35.5 flex-col items-start gap-2.75 rounded-site-12 px-2.75 pt-3.25 pb-3 max-[450px]:shrink-0 ${preview === "rent" ? "bg-site-catalog-surface-c" : "bg-white"}`}>
      {[0, 1, 2].map((row) => (
        <Image
          alt=""
          src={"/design/projects/" + (["gazprom", "soobota", "rent"].includes(preview) ? preview : "gazprom") + "-row-" + row + ".svg"}
          width={120}
          height={19}
          key={row}
          className="block h-4.75 w-30 shrink-0"
        />
      ))}
    </div>
    <span className="self-start text-[10px] font-semibold text-site-mini-window-surface-e max-[450px]:self-end">ПРОЕКТ</span>
  </div>
  );
};
