import type { getVisualText } from "../model/locale-content";

type ApproachModelGridProps = { copy: ReturnType<typeof getVisualText> };

export const ApproachModelGrid = (props: ApproachModelGridProps) => {
  const {
    copy,
  } = props;
  return (
    <div className="grid grid-cols-3 gap-2 max-[490px]:grid-cols-1">
      {copy.modelValues.map((name, index) => (
        <div key={name} data-motion="diagram" data-motion-order={index + 2} className="flex min-h-32 flex-col gap-3 rounded-xl p-4" style={{ background: ["var(--site-approach-surface-c)", "var(--site-approach-surface-d)", "var(--site-approach-surface-e)"][index], color: ["var(--site-approach-surface-f)", "var(--site-approach-surface-g)", "var(--site-approach-surface-h)"][index] }}>
          <span className="font-mono text-xs">0{index + 1}</span><strong className="text-[clamp(12px,1.3vw,21px)]">{name}</strong><span className="text-xs">{copy.modelDescriptions[index]}</span>
        </div>
      ))}
    </div>
  );
};
