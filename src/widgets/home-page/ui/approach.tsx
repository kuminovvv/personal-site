import Image from "next/image";
import { Intro } from "./intro";
import { Banner } from "./banner";
import type { SiteContent } from "@/shared/lib/content/get-site-content";

const asset = "/design/home/";

export const Approach = ({ content }: { content: SiteContent["home"]["approach"] }) => {
  return (
    <section className="mt-24 max-[900px]:mt-20 max-[680px]:mt-16">
      <Intro
        section="about"
        title={content.title}
        description={content.description}
      />
      <div className="grid grid-cols-3 gap-7 max-[900px]:gap-4 max-[680px]:grid-cols-1 max-[680px]:gap-5">
        {content.items.map(({ eyebrow, title, description, image }) => (
          <article className="min-w-0 rounded-[27px] bg-site-surface p-10 max-[1180px]:p-7 max-[900px]:p-5 max-[680px]:p-7 [&>span]:text-[12px] [&>span]:font-semibold [&>span]:text-site-green-text dark:text-site-green [&_h3]:mt-3.5 [&_h3]:text-[24px] max-[900px]:[&_h3]:text-[19px] [&_p]:mt-3 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:text-site-subtle" key={title}>
            <div className="mb-7 grid h-88.5 place-items-center overflow-hidden rounded-[20px] bg-[#f1f1f1] max-[1180px]:h-70 max-[900px]:h-55 max-[680px]:h-75 max-[680px]:mb-5 [&_img]:h-full [&_img]:w-full [&_img]:object-contain">
              <Image src={asset + image} alt="" width={400} height={354} />
            </div>
            <span>{eyebrow}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <Banner {...content.banner} />
    </section>
  );
};
