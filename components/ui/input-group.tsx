import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn("relative flex items-center", className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function InputGroupLeft({
  asChild,
  className,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="input-group-left"
      className={cn(
        "absolute left-3 flex items-center [&>svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupRight({
  asChild,
  className,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="input-group-right"
      className={cn(
        "absolute right-3 flex items-center [&>svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

export { InputGroup, InputGroupText, InputGroupLeft, InputGroupRight }
