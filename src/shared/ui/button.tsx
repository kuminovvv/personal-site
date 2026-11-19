import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { buttonVariants, styledButtonClasses } from "./button-variants";

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

const Button = (props: ButtonProps) => {
  const {
    className,
    variant = "default",
    size = "default",
    ...buttonProps
  } = props;
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(variant === "unstyled" ? undefined : styledButtonClasses, buttonVariants({ variant, size, className }))}
      {...buttonProps}
    />
  );
};

export { Button };
export { buttonVariants } from "./button-variants";
