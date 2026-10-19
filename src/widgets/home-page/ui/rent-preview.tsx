import Image from "next/image";

const asset = "/design/home/";

export const RentPreview = () => {
  return (
    <div className="my-3 h-80 overflow-hidden rounded-[18px] bg-[#f1f1f1] p-4 max-[900px]:h-60 max-[900px]:p-2 max-[680px]:h-70">
      <div className="h-full rounded-xl bg-white p-3 text-[#333]">
        <div className="flex min-h-8 items-center gap-2.5 text-[15px]">
          <span className="size-5.25 rounded-full bg-site-green" />
          <b>Аренда в Петербурге</b>
        </div>
        <div className="my-2 flex gap-1.5 rounded-[7px] bg-[#f1f1f1] p-1.25 [&_span]:flex-1 [&_span]:rounded-[5px] [&_span]:bg-white [&_span]:p-1.25 [&_span]:text-[10px] [&_span]:text-[#777]">
          <span>Метро</span>
          <span>Цена</span>
          <span>Комнаты</span>
        </div>
        <div className="grid h-[calc(100%-82px)] grid-cols-2 gap-1.75">
          <div className="grid gap-1.75 [&>div]:min-w-0 [&>div]:rounded-[7px] [&>div]:bg-[#e5f2e9] [&>div]:p-1.75 [&>div]:text-[10px] [&>div]:leading-tight [&_i]:block [&_i]:h-[77%] max-[900px]:[&_i]:h-[58%] [&_i]:rounded-[5px] [&_i]:bg-[#fff9]">
            {["2 комнаты · 54 м²", "Студия · 28 м²"].map((name) => (
              <div key={name}>
                <i />
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-around overflow-hidden rounded-[7px] bg-[#e5f2e9] [&_img]:h-6 [&_img]:w-37 [&_img]:shrink-0">
            <Image
              src={asset + "project-rent-2.svg"}
              alt=""
              width={148}
              height={24}
            />
            <Image
              src={asset + "project-rent-3.svg"}
              alt=""
              width={148}
              height={24}
            />
            <Image
              src={asset + "project-rent-2.svg"}
              alt=""
              width={148}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
