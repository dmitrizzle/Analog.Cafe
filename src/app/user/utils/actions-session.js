import { ROUTE_URL_USER_LANDING } from "../constants/routes-session"

export const redirectToSignIn = props => {
  props.addSessionInfo({ loginSuccess: props.history.location.pathname })
  props.history.replace({
    pathname: "/sign-in"
  })
}

export const redirectAfterSignIn = props => {
  const loginRedirect =
    props.user.sessionInfo.loginSuccess || ROUTE_URL_USER_LANDING
  loginRedirect &&
    props.history.replace({
      pathname: loginRedirect
    })
}

export const isForbidden = (event, props) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  props.setModal({
    info: {
      title: "Members Only",
      text:
        "You need to create or sign in to your free Analog.Cafe account to use this feature.",
      buttons: [
        {
          to: `/sign-in`,
          text: "Sign In"
        },
        {
          to: `/sign-in#create`,
          text: "Create Free Account",
          branded: true
        }
      ]
    }
  })
}
