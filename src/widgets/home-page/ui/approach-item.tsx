import Image from "next/image";

type ApproachItemProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export const ApproachItem = (props: ApproachItemProps) => {
  const {
    eyebrow,
    title,
    description,
    image,
  } = props;
  return (
    <article className="min-w-0 rounded-[27px] bg-site-surface p-10 max-[1180px]:p-7 max-[900px]:p-5 max-[680px]:p-7 [&>span]:text-[12px] [&>span]:font-semibold [&>span]:text-site-green-text dark:text-site-green [&_h3]:mt-3.5 [&_h3]:text-[24px] max-[900px]:[&_h3]:text-[19px] [&_p]:mt-3 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:text-site-subtle">
      <div className="mb-7 grid h-88.5 place-items-center overflow-hidden rounded-[20px] bg-site-approach-surface max-[1180px]:h-70 max-[900px]:h-55 max-[680px]:h-75 max-[680px]:mb-5 [&_img]:h-full [&_img]:w-full [&_img]:object-contain">
        <Image src={`/design/home/${image}`} alt="" width={400} height={354} />
      </div>
      <span>{eyebrow}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};
