type ContactClosingProps = { line: string; accent: string; description: string };

export const ContactClosing = (props: ContactClosingProps) => {
  const {
    line,
    accent,
    description,
  } = props;
  return <div className="mt-auto mb-14 flex items-center justify-between gap-4 [&_h4]:text-[24px] max-[680px]:[&_h4]:text-[18px] [&_p]:mt-3 [&_p]:text-[15px] [&_p]:text-site-subtle [&>strong]:grid [&>strong]:size-37 [&>strong]:place-items-center [&>strong]:rounded-full [&>strong]:bg-site-green [&>strong]:font-heading [&>strong]:text-[64px] [&>strong]:font-black [&>strong]:text-site-on-green max-[680px]:[&>strong]:size-22.5 max-[680px]:[&>strong]:text-[40px]"><div><h4>{line}<br />{accent}</h4><p>{description}</p></div><strong>K.</strong></div>;
};
