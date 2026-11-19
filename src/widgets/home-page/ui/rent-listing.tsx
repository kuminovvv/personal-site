import { homeAssetPath } from "../model/assets";
import Image from "next/image";



export const RentListing = () => (
  <div className="grid h-[calc(100%-82px)] grid-cols-2 gap-1.75">
    <div className="grid gap-1.75 [&>div]:min-w-0 [&>div]:rounded-[7px] [&>div]:bg-site-canvas-preview-surface-c [&>div]:p-1.75 [&>div]:text-[10px] [&>div]:leading-tight [&_i]:block [&_i]:h-[77%] max-[900px]:[&_i]:h-[58%] [&_i]:rounded-[5px] [&_i]:bg-site-rent-preview-surface">
      {["2 комнаты · 54 м²", "Студия · 28 м²"].map((name) => (
        <div key={name}>
          <i />
          <span>{name}</span>
        </div>
      ))}
    </div>
    <div className="flex flex-col items-center justify-around overflow-hidden rounded-[7px] bg-site-canvas-preview-surface-c [&_img]:h-6 [&_img]:w-37 [&_img]:shrink-0">
      <Image src={homeAssetPath + "project-rent-2.svg"} alt="" width={148} height={24} />
      <Image src={homeAssetPath + "project-rent-3.svg"} alt="" width={148} height={24} />
      <Image src={homeAssetPath + "project-rent-2.svg"} alt="" width={148} height={24} />
    </div>
  </div>
);
