type MiniWindowRowProps = { label: string; status: string; isHighlighted: boolean };

export const MiniWindowRow = (props: MiniWindowRowProps) => {
  const {
    label,
    status,
    isHighlighted,
  } = props;
  return (
    <div className="mb-1.75 flex h-7 items-center justify-between rounded-site-6 bg-site-mini-window-surface-d px-2.75 text-site-mini-window-surface-e [&>span:first-child]:gap-2 [&_i]:size-3">
      <span><i className={isHighlighted ? "bg-site-green!" : ""} />{label}</span><span>{status}</span>
    </div>
  );
};
