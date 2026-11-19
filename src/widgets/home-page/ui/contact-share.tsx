import { ShareButton } from "@/features/share-site";

type ContactShareProps = { title: string; description: string };

export const ContactShare = (props: ContactShareProps) => {
  const {
    title,
    description,
  } = props;
  return <div className="mt-10 flex min-h-34 items-center justify-between gap-8 rounded-[28px] bg-site-surface p-10 max-[680px]:mt-7 max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-6 max-[680px]:p-7 [&_h3]:text-[22px] [&_p]:mt-3 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:text-site-subtle"><div><h3>{title}</h3><p>{description}</p></div><ShareButton /></div>;
};
