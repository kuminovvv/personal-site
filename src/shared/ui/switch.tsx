import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/shared/lib/utils";

type SwitchProps = SwitchPrimitive.Root.Props & {
  className?: string;
};

export const Switch = (props: SwitchProps) => {
  const {
    className,
    ...switchProps
  } = props;
  return <SwitchPrimitive.Root
    data-slot="switch"
    className={cn(
      "group/switch relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-site-switch-accent outline-none transition-colors duration-200 data-checked:bg-site-switch-accent-b focus-visible:ring-2 focus-visible:ring-site-switch-accent-b focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-switch-border)] disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...switchProps}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block size-5 translate-x-0.5 rounded-full bg-site-switch-accent-c shadow-sm transition-transform duration-200 group-data-checked/switch:translate-x-[21px] group-data-checked/switch:bg-site-switch-border" />
  </SwitchPrimitive.Root>;
};
