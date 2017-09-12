import { ROUTE_SUBMISSION_API } from "../../../../../constants/submission"

// this function kicks user to sign-in scdreen but rembers where to come back to
export const redirectToSignIn = props => {
  props.setLoginRedirectRoutes({ success: props.history.location.pathname })
  props.history.replace({
    pathname: "/sign-in"
  })
}

export const sendSubmission = (data, props) => {
  props.sendUpload({
    method: "post",
    data,
    onUploadProgress: progressEvent => {
      let percentCompleted
      percentCompleted = Math.round(
        progressEvent.loaded * 100 / progressEvent.total
      )
      console.log("Upload percent complete: " + percentCompleted)
    },
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "JWT " + localStorage.getItem("token")
    },
    url: ROUTE_SUBMISSION_API
  })
}
