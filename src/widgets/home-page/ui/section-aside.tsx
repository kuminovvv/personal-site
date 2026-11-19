import type { ReactNode } from "react";

type SectionAsideProps = {
  label: string;
  children: ReactNode;
};

export const SectionAside = (props: SectionAsideProps) => {
  const {
    label,
    children,
  } = props;
  return ((
  <div className="flex min-h-32 min-w-58.75 flex-col justify-center gap-3 rounded-[28px] bg-site-surface p-8 max-[680px]:mt-5 max-[680px]:min-h-0 max-[680px]:w-fit max-[680px]:p-5 [&>span]:whitespace-nowrap [&>span]:text-[11px] [&>span]:font-semibold [&>span]:text-site-green-text dark:text-site-green [&_strong]:whitespace-nowrap [&_strong]:font-heading [&_strong]:text-[26px] [&_strong]:leading-none max-[900px]:[&_strong]:whitespace-normal max-[900px]:[&_strong]:text-[22px] [&_strong_i]:mx-1.75 [&_strong_i]:mb-1.5 [&_strong_i]:inline-block [&_strong_i]:h-0.75 [&_strong_i]:w-10.5 max-[900px]:[&_strong_i]:w-5 [&_strong_i]:bg-site-green [&_strong_small]:font-sans [&_strong_small]:text-[20px] max-[900px]:[&_strong_small]:text-[16px] [&_strong_small]:font-semibold">
    <span>{label}</span>
    <strong>{children}</strong>
  </div>
));
};
