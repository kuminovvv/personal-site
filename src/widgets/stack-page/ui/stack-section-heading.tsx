type Props = {
  title: string;
  description: string;
};

export const StackSectionHeading = (props: Props) => {
  const {
    title,
    description,
  } = props;
  return (
  <div className="flex flex-wrap items-end justify-between gap-3">
    <h2 className="font-heading text-[21px] leading-[1.2] font-bold tracking-[-0.035em] max-[680px]:text-[19px]">{title}</h2>
    <p className="text-[12px] leading-[1.4] text-site-subtle">{description}</p>
  </div>
  );
};
