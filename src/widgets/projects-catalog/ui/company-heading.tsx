type CompanyHeadingProps = {
    title: string;
    description: string;
    count: string;
};

export const CompanyHeading = (props: CompanyHeadingProps) => {
    const {
    title,
    description,
    count,
  } = props;
    return (
    <div className="flex min-h-12.75 items-center justify-between gap-4">
        <div>
            <h3 className="font-sans text-[19px] leading-[1.2] font-bold tracking-normal max-[680px]:text-[16px]">{title}</h3>
            <p className="mt-1.75 text-[13px] text-site-subtle max-[680px]:text-[12px]">{description}</p>
        </div>
        <span className="rounded-full bg-site-surface px-3 py-2 text-[13px] font-semibold whitespace-nowrap max-[400px]:px-2.25 max-[400px]:py-1.75 max-[400px]:text-[11px]">{count}</span>
    </div>
    );
};
