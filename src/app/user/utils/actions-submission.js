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
  if (props.editor.status.id && props.user.info.role === "admin") {
    method = "put"
    if (props.editor.status.type === "unpublished")
      url += "/" + props.editor.status.id
    else if (props.editor.status.type === "published")
      url = ROUTE_API_ARTICLES + "/" + props.editor.status.id
  }
  props.uploadSubmission({
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
