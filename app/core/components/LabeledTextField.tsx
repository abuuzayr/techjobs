import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { Form } from "react-bulma-components"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
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
        <Form.Label style={{ fontWeight: "normal"}}>{label}</Form.Label>
        <Form.Control>
          <Form.Input disabled={submitting} {...input} {...props} ref={ref} />
        </Form.Control>
        {normalizedError && (
          <Form.Help color="danger">{normalizedError}</Form.Help>
        )}
      </Form.Field>
    )
  }
)

export default LabeledTextField
