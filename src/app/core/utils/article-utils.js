// constants
import { HOST_PROD, HOST_PROTOCOL } from "../../constants"
import {
  ROUTE_URL_SUBMISSIONS,
  ROUTE_URL_ARTICLES,
  ROUTE_API_SUBMISSIONS,
  ROUTE_API_ARTICLES
} from "../constants/article"

// return path type for submissions vs published works
export const locate = locationPathname => {
  return {
    pathname: locationPathname.includes(ROUTE_URL_SUBMISSIONS)
      ? ROUTE_URL_SUBMISSIONS
      : ROUTE_URL_ARTICLES,
    apiRoute: locationPathname.includes(ROUTE_URL_SUBMISSIONS)
      ? ROUTE_API_SUBMISSIONS
      : ROUTE_API_ARTICLES
  }
}

// generate complete url path for social sharing
export const completeUrlPath = (route, slug) => {
  return encodeURI(HOST_PROTOCOL + HOST_PROD + route + "/" + slug)
}
