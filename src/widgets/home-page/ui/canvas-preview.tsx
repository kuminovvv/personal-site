import Image from "next/image";

const asset = "/design/home/";

export const CanvasPreview = () => {
  return (
    <div className="my-3 h-80 overflow-hidden rounded-[18px] bg-[#f1f1f1] p-4 max-[900px]:h-60 max-[900px]:p-2 max-[680px]:h-70">
      <div className="h-full rounded-xl bg-[#22272b] p-3 text-white">
        <div className="flex min-h-8 items-center gap-2.5 text-[15px]">
          <span className="size-5.25 rounded-full bg-site-green" />
          <b>Segment Editor</b>
        </div>
        <div className="my-2 flex h-7 gap-1.5 rounded-site-6 bg-[#f1f1f1] p-2.25 [&_i]:h-1.25 [&_i]:w-1/5 [&_i]:rounded-[5px] [&_i]:bg-[#dedede] [&_i:nth-child(3)]:bg-site-green">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="grid h-[calc(100%-80px)] grid-cols-[80px_1fr] gap-2">
          <div className="grid content-start gap-4 text-[11px] text-[#aaa] [&_img]:h-3.5 [&_img]:w-20">
            <span>СЛОИ</span>
            {[0, 1, 0, 3].map((layer, index) => (
              <Image
                src={asset + `project-canvas-layer-${layer}.svg`}
                alt=""
                width={80}
                height={14}
                key={index}
              />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1 rounded-lg bg-white p-2.5 [&_i]:bg-[#e6e9e7] [&_i:nth-child(even)]:bg-[#e5f2e9]">
            {Array.from({ length: 25 }, (_, index) => (
              <i
                className={index === 7 || index === 12 ? "!bg-site-green" : ""}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
