export const SocialPost = (props: { name: string; index: number }) => {
  const {
    name,
    index,
  } = props;
  return <div className="rounded-lg bg-site-approach-surface px-2.5 py-2.25 text-[11px] [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&_i]:ml-6.75 [&_i]:mt-2 [&_i]:block [&_i]:h-1.25 [&_i]:w-[80%] [&_i]:rounded-[5px] [&_i]:bg-site-social-preview-surface-b [&_i:last-child]:w-[55%]"><div><span aria-hidden="true" className={`size-4.75 shrink-0 rounded-full ${index ? "bg-site-green" : "bg-site-canvas-preview-surface-c"}`} /><b>{name}</b></div><i /><i /></div>;
};
