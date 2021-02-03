import { Head } from "blitz"
import { Button, Heading } from "react-bulma-components"
import styled from "styled-components"
import { RiMailAddLine } from "react-icons/ri"

const Form = styled.div`
  margin-top: 2rem;
  padding: 3rem;
  background: #f0f1f6;
  text-align: center;
  .email-octopus-success-message:not(:empty),
  .email-octopus-error-message:not(:empty) {
    margin-bottom: 10px;
  }
  .email-octopus-error-message {
    color: #e74c3c;
  }
  .email-octopus-form {
    width: 100%;
  }
  .email-octopus-form-row {
    margin-bottom: 15px;
  }
  .email-octopus-form-row-hp {
    position: absolute;
    left: -5000px;
  }
  .email-octopus-form-row label {
    display: block;
  }
  .email-octopus-form-row input {
    width: 100%;
    max-width: 600px;
    padding: 20px;
    height: 40px;
    border: 2px solid #ccc;
    font-size: 16px;
  }
  .email-octopus-form-row-consent {
    margin-top: 20px;
  }
  .email-octopus-form-row-consent label {
    vertical-align: middle;
    margin-left: 5px;
    font-size: 12px;
  }
  .email-octopus-form-row-subscribe {
    margin-top: 20px;
    button {
      width: 200px;
    }
  }
  svg {
    vertical-align: middle;
  }
`

const Subscribe = () => {
  return (
    <Form className="email-octopus-form-wrapper">
      <Head>
        <script src="https://emailoctopus.com/bundles/emailoctopuslist/js/1.5/formEmbed.js" defer></script>
      </Head>
      <Heading size={4} renderAs="h4">
        <RiMailAddLine /> Get new jobs in your inbox weekly
      </Heading>
      <p className="email-octopus-success-message"></p>
      <form
        method="post"
        action="https://emailoctopus.com/lists/d94d7bfc-b4f4-11ea-a3d0-06b4694bee2a/members/embedded/1.3/add"
        className="email-octopus-form"
        data-sitekey="6LdYsmsUAAAAAPXVTt-ovRsPIJ_IVhvYBBhGvRV6"
      >
        <p className="email-octopus-error-message"></p>

        <div className="email-octopus-form-row">
          <input id="field_0" name="field_0" type="email" placeholder="Email address" />
        </div>

        <div className="email-octopus-form-row-consent">
          <input type="checkbox" id="consent" name="consent" />
          <label htmlFor="consent">I consent to receiving new jobs weekly via email</label>
        </div>

        <div className="email-octopus-form-row-hp" aria-hidden="true">
          <input
            type="text"
            name="hpd94d7bfc-b4f4-11ea-a3d0-06b4694bee2a"
            tabIndex={-1}
            autoComplete="false"
          />
        </div>

        <div className="email-octopus-form-row-subscribe">
          <input type="hidden" name="successRedirectUrl" value="" />
          <Button small={1} color="success" type="submit">
            Subscribe
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default Subscribe
