import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-on-primary shadow-premium hover:bg-primary/90",
        destructive:
          "bg-error text-on-error shadow-sm hover:bg-error/90",
        outline:
          "border border-outline-variant bg-surface hover:bg-surface-container-low hover:text-on-surface",
        secondary:
          "bg-secondary text-on-secondary shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-surface-container-low hover:text-on-surface",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-secondary-fixed text-on-secondary-fixed shadow-luxury hover:bg-secondary-fixed-dim transition-all active:scale-95",
        noir: "bg-primary-container text-surface hover:bg-on-surface transition-all border border-on-primary-fixed-variant/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
