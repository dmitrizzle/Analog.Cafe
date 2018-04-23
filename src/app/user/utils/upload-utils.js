import {
  ROUTE_API_ARTICLES,
  ROUTE_API_SUBMISSIONS
} from "../../core/constants/routes-article"
import { forceImageRestrictions } from "./upload-utils"

export {
  forceImageRestrictions
} from "@roast-cms/french-press-editor/dist/utils/image-rules"

// this function kicks user to sign-in scdreen but rembers where to come back to
export const redirectToSignIn = props => {
  props.setLoginRedirectRoutes({ success: props.history.location.pathname })
  props.history.replace({
    pathname: "/sign-in"
  })
}

// convenience function that sends all form data to server
export const sendSubmission = (data, props) => {
  let url = ROUTE_API_SUBMISSIONS
  let method = "post"
  if (props.composer.submissionStatus.id && props.user.info.role === "admin") {
    method = "put"
    if (props.composer.submissionStatus.type === "unpublished")
      url += "/" + props.composer.submissionStatus.id
    else if (props.composer.submissionStatus.type === "published")
      url = ROUTE_API_ARTICLES + "/" + props.composer.submissionStatus.id
  }
  props.uploadSubmissionData({
    method,
    data,
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "JWT " + localStorage.getItem("token")
    },
    url
  })
}
