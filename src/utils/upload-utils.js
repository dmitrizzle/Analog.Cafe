import { ROUTE_SUBMISSION_API } from "../constants/submission"

// image size limit for user uploads
export const imageSizeLimit = (size, max = 10) => {
  return new Promise((resolve, reject) => {
    if (size / 1000000 <= max) resolve()
    else reject()
  })
}

// this function kicks user to sign-in scdreen but rembers where to come back to
export const redirectToSignIn = props => {
  props.setLoginRedirectRoutes({ success: props.history.location.pathname })
  props.history.replace({
    pathname: "/sign-in"
  })
}

// convenience function that sends all form data to server
export const sendSubmission = (data, props) => {
  props.uploadSubmissionData({
    method: "post",
    data,
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "JWT " + localStorage.getItem("token")
    },
    url: ROUTE_SUBMISSION_API
  })
}
