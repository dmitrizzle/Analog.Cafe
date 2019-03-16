export const redirectToSignIn = props => {
  props.setUserRoutes({ success: props.history.location.pathname })
  props.history.replace({
    pathname: "/sign-in"
  })
}

export const isForbidden = (event, props) => {
  event.preventDefault()
  event.stopPropagation()
  props.setModal({
    info: {
      title: "Members Only Content",
      text: "You need to create or sign in to your free Analog.Cafe account.",
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
