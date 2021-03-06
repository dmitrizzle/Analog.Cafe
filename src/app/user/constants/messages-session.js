import React from "react"

export const CARD_ERRORS = {
  CONNECTION_OFFLINE: {
    info: {
      title: "Connection Trouble 🔌",
      text:
        "You got disconnected from the internet. Don’t worry: you will not lose any of your work."
    },
    id: "hints/connection"
  },
  AUTHENICATION: {
    title: "You’re Signed Out"
  },
  LOGIN_EMAIL: {
    title: "Couldn’t Send Email",
    text:
      "For some reason an email with sign in link couldn’t be sent. Please try again or consider using Twitter or Facebook buttons."
  },
  LOGIN_EMAIL_TIMEOUT: remaining => {
    return {
      title: "Please Try in a Bit",
      text: `Please wait ${
        remaining > 59 ? "a minute" : remaining + " seconds" || 60
      } before requesting another login link to be sent to your email.`
    }
  },
  LOGIN_EMAIL_BAD_TOKEN: {
    title: "Couldn’t Sign In",
    text:
      "Sorry, we couldn’t sign you in. Perhaps link has expired. Try signing in with your email again."
  }
}
export const CARD_ALERTS = {
  LOGIN_EMAIL: email => {
    return {
      info: {
        image: "image-froth_3525424_rJ1m0e15m",
        title: "Check Your Email",
        text: (
          <span>
            Please check your {email} inbox and{" "}
            <strong style={{ fontStyle: "normal" }}>
              click the link we just sent you
            </strong>
            .
          </span>
        )
      },
      id: "hints/check-email"
    }
  }
}
