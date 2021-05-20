import { useState, useEffect } from "react"
import { Head, useMutation, useRouter } from "blitz"
import { Form, FormProps, FORM_ERROR } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { LabeledTextAreaField } from "app/core/components/LabeledTextAreaField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import { Container, Form as BulmaForm, Heading } from "react-bulma-components"
import createJob from "app/jobs/mutations/createJob"
import Toast from 'light-toast';

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export function JobForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const router = useRouter()
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [submit, setSubmit] = useState(false)
  const [values, setValues] = useState({})
  const [createJobMutation] = useMutation(createJob)
  
  const onSubmitWithPayment = (values) => {
    setValues(values)
    setSubmit(true)
  }

  useEffect(() => {
    if (processing) {
      Toast.loading('Processing payment...')
    } else {
      Toast.hide()
    }
  }, [processing])

  useEffect(() => {
    async function submitValues() {
      try {
        // @ts-ignore
        const newJob = await createJobMutation({...values, type: "featured"})
        if (newJob) {
          Toast.hide()
          Toast.success('Featured job added successfully!')
          router.push('/category/featured')
        } else {
          Toast.hide()
          Toast.fail("Error adding job! Please contact us at hello@techjobs.sg", Infinity)
        }
      } catch (error) {
        Toast.hide()
        Toast.fail("Error adding job! Please contact us at hello@techjobs.sg", Infinity)
        return { [FORM_ERROR]: error.toString() }
      }
      Toast.hide()
    }
    if (succeeded) {
      Toast.loading("Adding featured job")
      submitValues()
    } else {
      Toast.hide()
    }
  }, [succeeded])
  return (
    <>
      <Head>
        <title>Post a new job | techjobs.sg</title>
      </Head>
      <Container style={{ padding: "2rem" }} className="new-job-form">
        <Heading>Post a featured job</Heading>
        <Heading subtitle>
          &mdash; Featured jobs always appear at the top
          <br />
          &mdash; For only $49
        </Heading>
        <Form<S>
          {...props}
          {...{ disabled, processing, succeeded, error }}
          onSubmit={onSubmitWithPayment}
        >
          <LabeledTextField label="Job Name *" name="name" placeholder="e.g. Front end developer" />
          <LabeledTextField
            label="Job URL *"
            name="url"
            placeholder="Url to the job posting to apply"
          />
          <LabeledTextAreaField
            label="About the job *"
            name="description"
            placeholder="HTML tags are accepted"
          />
          <LabeledTextField
            label="Job tags *"
            name="tags"
            placeholder="Enter comma delimited tags, e.g. java, kafka, react.."
          />
          <BulmaForm.Field>
            <BulmaForm.Field kind="group">
              <BulmaForm.Control>
                <LabeledTextField
                  label="Salary Min ($)"
                  name="salaryMin"
                  placeholder="5000"
                  type="number"
                />
              </BulmaForm.Control>
              <BulmaForm.Control>
                <LabeledTextField
                  label="Salary Max ($)"
                  name="salaryMax"
                  placeholder="10000"
                  type="number"
                />
              </BulmaForm.Control>
            </BulmaForm.Field>
          </BulmaForm.Field>
          <LabeledTextField
            label="Job / Company avatar "
            name="avatar"
            placeholder="URL to image to show on job"
          />
          <LabeledTextField
            label="Company name *"
            name="company"
            placeholder="e.g. Facebook, Amazon"
          />
          <LabeledTextAreaField
            label="About the company *"
            name="companyDescription"
            placeholder="Some information about the company"
          />
          <LabeledTextField
            label="Company url *"
            name="companyUrl"
            placeholder="URL to the company website/jobs page"
          />
          <LabeledTextField
            label="Company Glassdoor Page URL"
            name="companyGdUrl"
            placeholder="Optional, we will get company ratings"
          />
          <LabeledTextField
            label="Company LinkedIn Page URL"
            name="companyLiUrl"
            placeholder="Optional, we will get company data from the about page"
          />
          <LabeledTextField
            label="Submission email"
            name="email"
            placeholder="Your email address"
          />
          <BulmaForm.Field>
            <BulmaForm.Label style={{ fontWeight: "normal" }}>
              Payment details (S$49)
              <img
                src="/stripe.svg"
                alt="powered by stripe"
                style={{ display: "inline-block", width: 120, float: "right" }}
              />
            </BulmaForm.Label>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                {...{
                  succeeded,
                  setSucceeded,
                  error,
                  setError,
                  processing,
                  setProcessing,
                  disabled,
                  setDisabled,
                  submit,
                }}
              />
              {error && <BulmaForm.Help color="danger">{error}</BulmaForm.Help>}
            </Elements>
          </BulmaForm.Field>
        </Form>
      </Container>
    </>
  )
}
