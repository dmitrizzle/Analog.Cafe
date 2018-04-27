export const redirectToSignIn = props => {
  props.setUserRoutes({ success: props.history.location.pathname })
  props.history.replace({
    pathname: "/sign-in"
  })
}
