import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function ButtonGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group"
      className={cn("flex flex-wrap items-center justify-center", className)}
      {...props}
    />
  )
}

function ButtonGroupItem({
  className,
  "data-active": dataActive,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="button-group-item"
      data-active={dataActive}
      className={cn(
        "text-muted-foreground focus-visible:text-foreground relative rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 text-sm font-medium shadow-none hover:bg-transparent hover:text-foreground focus-visible:z-10 focus-visible:bg-transparent focus-visible:shadow-none focus-visible:outline-none disabled:bg-transparent data-[active=true]:border-primary data-[active=true]:text-primary",
        className
      )}
      {...props}
    />
  )
}


export { ButtonGroup, ButtonGroupItem }
