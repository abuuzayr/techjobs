import { Head } from "blitz"
import { Button, Heading } from "react-bulma-components"
import { RiMailAddLine } from "react-icons/ri"

const Subscribe = () => {
  return (
    <div className="email-octopus-form-wrapper">
      <Head>
        <script
          src="https://emailoctopus.com/bundles/emailoctopuslist/js/1.5/formEmbed.js"
          defer
        ></script>
      </Head>
      <Heading size={4} renderAs="h4">
        <RiMailAddLine /> Get new jobs in your inbox weekly
      </Heading>
      <p className="email-octopus-success-message"></p>
      <form
        method="post"
        action="https://emailoctopus.com/lists/d94d7bfc-b4f4-11ea-a3d0-06b4694bee2a/members/embedded/1.3/add"
        className="email-octopus-form bound"
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
    </div>
  )
}

export default Subscribe
