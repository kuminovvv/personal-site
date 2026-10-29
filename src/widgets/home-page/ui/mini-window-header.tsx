type MiniWindowHeaderProps = { isUniversity: boolean };

export const MiniWindowHeader = (props: MiniWindowHeaderProps) => {
  const {
    isUniversity,
  } = props;
  return (
    <div className="mb-2.75 flex h-6.5 items-center justify-between [&>span]:gap-1.5 [&_i]:size-2.25 [&_i]:rounded-full [&_i]:bg-site-mini-window-surface-c [&_b]:font-semibold">
      <span><i /><i /><i /></span>
      <b>{isUniversity ? "Портал университета" : "Редактор данных"}</b>
    </div>
  );
};
