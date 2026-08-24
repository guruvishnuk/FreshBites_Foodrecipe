import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Simple custom variants mapping
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/20",
      destructive: "bg-accent-red text-white hover:bg-red-600 shadow-md",
      outline: "border-2 border-border bg-transparent hover:bg-muted text-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-opacity-90 shadow-md",
      ghost: "hover:bg-muted text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-11 px-5 py-2",
      sm: "h-9 rounded-full px-4",
      lg: "h-14 rounded-full px-10 text-lg",
      icon: "h-11 w-11",
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:scale-[1.02]",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
