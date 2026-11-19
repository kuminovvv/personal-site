type HeroStatsProps = { stats: readonly { value: string; label: string }[] };

export const HeroStats = (props: HeroStatsProps) => {
  const {
    stats,
  } = props;
  return (
    <div className="flex flex-wrap gap-8 max-[1180px]:gap-2 max-[680px]:justify-between max-[400px]:gap-3 [&_div]:grid [&_div]:gap-2 [&_div]:p-4 max-[900px]:[&_div]:p-2 max-[680px]:[&_div]:px-0 max-[680px]:[&_div]:py-1.25 [&_b]:text-[16px] [&_span]:text-[14px] [&_span]:text-site-subtle max-[900px]:[&_span]:text-[12px]">
      {stats.map((stat) => <div key={stat.label}><b>{stat.value}</b><span>{stat.label}</span></div>)}
    </div>
  );
};
