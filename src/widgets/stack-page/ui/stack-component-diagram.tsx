import { cn } from "@/shared/lib/utils";
import type { getStackUiCopy } from "../model/ui-copy";

type StackComponentDiagramProps = { copy: ReturnType<typeof getStackUiCopy>; };

export const StackComponentDiagram = (props: StackComponentDiagramProps) => {
  const {
    copy,
  } = props;
  return (
<div className="min-w-0 flex-1 rounded-[9px] bg-white p-3 max-[400px]:p-2">
            <div className="flex items-center gap-2 text-[12px] font-semibold text-site-mini-window-surface-b">
              <span className="size-2.25 shrink-0 rounded-full bg-site-stack-surface-d" aria-hidden="true" />
              <span>{copy.components}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div className="h-10 rounded-[6px] bg-site-stack-surface-b p-2" key={i}>
                  <span className={cn("block h-1.5 rounded-full bg-site-stack-surface-c", i === 1 ? "w-4/5 bg-site-stack-surface-d" : "w-3/4")} />
                </div>
              ))}
            </div>
          </div>
  );
};
