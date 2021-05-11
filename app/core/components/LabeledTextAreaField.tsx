import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { Form, Block, Icon } from "react-bulma-components"

export interface LabeledTextAreaFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextAreaField = forwardRef<HTMLInputElement, LabeledTextAreaFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <Form.Field {...outerProps}>
        <Form.Label>{label}</Form.Label>
        <Form.Control>
          <Form.Textarea disabled={submitting} {...props} ref={ref} />
        </Form.Control>
        {touched && normalizedError && (
          <Form.Help color="error">{normalizedError}</Form.Help>
        )}
      </Form.Field>
    )
  }
)

export default LabeledTextAreaField
