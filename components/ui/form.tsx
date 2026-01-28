import * as React from "react"
import {
  FormProvider,
  useForm as useHookForm,
  type UseFormReturn,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
  useField,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupLeft,
  InputGroupRight,
  InputGroupText,
} from "@/components/ui/input-group"

function Form({
  className,
  ...props
}: React.ComponentProps<typeof FormProvider>) {
  return <FormProvider {...props} />
}

function FormField({
  className,
  ...props
}: React.ComponentProps<typeof Field>) {
  return <Field {...props} />
}

function FormFieldControl({
  className,
  ...props
}: React.ComponentProps<typeof FieldControl>) {
  return <FieldControl {...props} />
}

function FormFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof FieldLabel>) {
  return <FieldLabel {...props} />
}

function FormFieldError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return <FieldError {...props} />
}

function useFormField() {
  return useField()
}

const FormInputGroup = InputGroup
const FormInputGroupLeft = InputGroupLeft
const FormInputGroupRight = InputGroupRight
const FormInputGroupText = InputGroupText

function useForm<T extends object>(
  schema: any,
  options?: Parameters<typeof useHookForm>[0]
) {
  return useHookForm<T>({
    resolver: zodResolver(schema),
    ...options,
  })
}

export {
  Form,
  FormField,
  FormFieldControl,
  FormFieldLabel,
  FormFieldError,
  useFormField,
  FormInputGroup,
  FormInputGroupLeft,
  FormInputGroupRight,
  FormInputGroupText,
  useForm,
}
export type { UseFormReturn }
