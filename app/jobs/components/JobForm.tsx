import { Head } from "blitz"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { LabeledTextAreaField } from "app/core/components/LabeledTextAreaField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import { Container, Form as BulmaForm, Heading } from "react-bulma-components"

export function JobForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <>
      <Head>
        <title>Post a new job | techjobs.sg</title>
      </Head>
      <Container style={{ padding: "2rem 2rem 0" }} className="new-job-form">
        <Heading>Post a featured job</Heading>
        <Heading subtitle>
          &mdash; Featured jobs always appear at the top
          <br />
          &mdash; For only $49
        </Heading>
        <Form<S> {...props}>
          <LabeledTextField label="Job Name *" name="name" placeholder="e.g. Front end developer" />
          <LabeledTextField
            label="Job URL"
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
          <BulmaForm.Field kind="group">
            <BulmaForm.Control>
              <LabeledTextField label="Salary Min ($)" name="salaryMin" placeholder="5000" />
            </BulmaForm.Control>
            <BulmaForm.Control>
              <LabeledTextField label="Salary Max ($)" name="salaryMax" placeholder="10000" />
            </BulmaForm.Control>
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
          <LabeledTextField label="Submission email" name="email" placeholder="Your email address" />
        </Form>
      </Container>
    </>
  )
}
