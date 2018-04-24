import { HOST_PROD, HOST_PROTOCOL } from "../../constants"

export const getAbsoluteURLPath = (route, slug) => {
  return encodeURI(HOST_PROTOCOL + HOST_PROD + route + "/" + slug)
}
