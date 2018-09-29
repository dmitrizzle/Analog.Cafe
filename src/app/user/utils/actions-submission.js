import throttle from "lodash/throttle"

import { INPUT_HEADER_DEFAULTS } from "../constants/rules-submission"
import {
  ROUTE_API_ARTICLES,
  ROUTE_API_SUBMISSIONS
} from "../../core/constants/routes-article"

export {
  forceImageRestrictions,
  fileToBase64
} from "@roast-cms/french-press-editor/dist/utils/image"

// https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
export const base64ToBlob = string => {
  if (string instanceof Blob) return string

  let byteString
  if (string.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(string.split(",")[1])
  else byteString = unescape(string.split(",")[1])
  const mimeString = string
    .split(",")[0]
    .split(":")[1]
    .split(";")[0]
  let ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], { type: mimeString })
}

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
