import throttle from "lodash/throttle"

import { INPUT_HEADER_DEFAULTS } from "../constants/rules-submission"
import {
  ROUTE_API_ARTICLES,
  ROUTE_API_SUBMISSIONS
} from "../../core/constants/routes-article"

export {
  forceImageRestrictions
} from "@roast-cms/french-press-editor/dist/utils/image-rules"

export const sendSubmission = (data, props) => {
  let url = ROUTE_API_SUBMISSIONS
  let method = "post"
  if (
    props.submission.submissionStatus.id &&
    props.user.info.role === "admin"
  ) {
    method = "put"
    if (props.submission.submissionStatus.type === "unpublished")
      url += "/" + props.submission.submissionStatus.id
    else if (props.submission.submissionStatus.type === "published")
      url = ROUTE_API_ARTICLES + "/" + props.submission.submissionStatus.id
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
export const storeHeaderState = header => {
  const headerState = JSON.stringify(header)
  localStorage.setItem("composer-header-state", headerState)
}
export const saveHeader = throttle(header => storeHeaderState(header), 3000)

export const loadHeader = () => {
  let local = localStorage.getItem("composer-header-state")
  return local ? JSON.parse(local) : INPUT_HEADER_DEFAULTS
}
