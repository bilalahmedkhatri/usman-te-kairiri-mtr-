import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const FieldContext = React.createContext<{
  inputId: string
  errorId: string
  isError: boolean
  isRequired: boolean
}>({
  inputId: "",
  errorId: "",
  isError: false,
  isRequired: false,
})

function Field({
  className,
  ...props
}: React.ComponentProps<"div"> & {
  isError?: boolean
  isRequired?: boolean
}) {
  const id = React.useId()
  const { isError = false, isRequired = false } = props
  return (
    <FieldContext.Provider
      value={{
        inputId: `field-input-${id}`,
        errorId: `field-error-${id}`,
        isError,
        isRequired,
      }}
    >
      <div
        data-slot="field"
        data-error={isError}
        data-required={isRequired}
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FieldContext.Provider>
  )
}

function FieldControl({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
  return (
    <Slot data-slot="field-control" className={cn("flex", className)} {...props} />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { inputId } = React.useContext(FieldContext)
  return (
    <Label
      data-slot="field-label"
      htmlFor={inputId}
      className={cn("w-fit", className)}
      {...props}
    />
  )
}

function useField() {
  const { inputId, errorId, isError } = React.useContext(FieldContext)
  return {
    id: inputId,
    "aria-invalid": isError,
    "aria-describedby": isError ? errorId : undefined,
  }
}

function FieldError({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { errorId, isError } = React.useContext(FieldContext)

  if (!isError) {
    return null
  }

  return (
    <p
      data-slot="field-error"
      id={errorId}
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  )
}

export { Field, FieldControl, FieldLabel, FieldError, useField }
