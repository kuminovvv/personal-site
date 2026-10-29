type ContactBrandCardProps = { brandStatement: string; brandExplanation: string };

export const ContactBrandCard = (props: ContactBrandCardProps) => {
  const {
    brandStatement,
    brandExplanation,
  } = props;
  return <div className="flex items-center gap-3 rounded-[26px] bg-site-surface px-9 py-5.5 text-[14px] max-[680px]:px-7 [&>strong]:grid [&>strong]:size-8 [&>strong]:shrink-0 [&>strong]:place-items-center [&>strong]:rounded-full [&>strong]:bg-site-green [&>strong]:text-site-on-green [&>strong]:font-heading [&_span]:text-site-subtle [&_b]:text-site-text"><strong>K.</strong><span><b>{brandStatement}</b><br />{brandExplanation}</span></div>;
};
