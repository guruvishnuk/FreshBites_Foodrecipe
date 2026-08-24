import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default:
      "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary-hover",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-accent-red text-white shadow hover:bg-accent-red/80",
    outline: "text-foreground border-border",
    yellow: "border-transparent bg-accent-yellow text-yellow-950 shadow",
    green: "border-transparent bg-accent-green text-green-950 shadow",
  }
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant as keyof typeof variants] || variants.default,
        className
      )}
      {...props}
    />
  )
}

export { Badge }
