type ContactMainProps = { content: {
  availability: string; callTitleLine: string; callTitleAccent: string; callDescription: string;
  interests: readonly string[]; closingLine: string; closingAccent: string; closingDescription: string; callNote: string;
} };

export const ContactMain = (props: ContactMainProps) => {
  const {
    content,
  } = props;
  return (
    <div className="flex min-h-153.75 flex-col rounded-[30px] bg-site-surface p-12 text-site-text max-[1180px]:p-10 max-[680px]:min-h-140 max-[680px]:p-7 [&>span]:text-[13px] [&>span]:text-site-subtle [&>span::first-letter]:text-site-green-text dark:text-site-green [&_small]:text-[13px] [&_small]:text-site-subtle [&_small::first-letter]:text-site-green-text dark:text-site-green [&_h3]:mt-14 [&_h3]:text-[clamp(34px,3vw,48px)] [&>p]:mt-10 [&>p]:text-[18px] [&>p]:leading-[1.6] [&>p]:text-site-subtle">
      <span>{content.availability}</span><h3>{content.callTitleLine}<br />{content.callTitleAccent}</h3><p>{content.callDescription}</p>
      <div className="mt-10 flex flex-wrap gap-2.5 [&_span]:rounded-full [&_span]:bg-site-soft [&_span]:px-5 [&_span]:py-2.5 [&_span]:text-[11px] [&_span]:text-site-subtle">{content.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
      <ContactClosing line={content.closingLine} accent={content.closingAccent} description={content.closingDescription} />
      <small>{content.callNote}</small>
    </div>
  );
};
import { ContactClosing } from "./contact-closing";
