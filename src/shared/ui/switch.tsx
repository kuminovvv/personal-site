import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/shared/lib/utils";

type SwitchProps = SwitchPrimitive.Root.Props & {
  className?: string;
};

export const Switch = ({ className, ...props }: SwitchProps) => (
  <SwitchPrimitive.Root
    data-slot="switch"
    className={cn(
      "group/switch relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-[#557064] outline-none transition-colors duration-200 data-checked:bg-[#bfff84] focus-visible:ring-2 focus-visible:ring-[#bfff84] focus-visible:ring-offset-2 focus-visible:ring-offset-[#133a2c] disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block size-5 translate-x-0.5 rounded-full bg-[#f7fff7] shadow-sm transition-transform duration-200 group-data-checked/switch:translate-x-[21px] group-data-checked/switch:bg-[#133a2c]" />
  </SwitchPrimitive.Root>
);
