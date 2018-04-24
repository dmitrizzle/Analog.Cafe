import { HOST_PROD, HOST_PROTOCOL } from "../../constants"
import {
  ROUTE_API_ARTICLES,
  ROUTE_API_SUBMISSIONS,
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../constants/routes-article"

export const getAbsoluteURLPath = (route, slug) => {
  return encodeURI(HOST_PROTOCOL + HOST_PROD + route + "/" + slug)
}
export const getSubmissionOrArticleRoute = locationPathname => {
  return {
    pathname: locationPathname.includes(ROUTE_URL_SUBMISSIONS)
      ? ROUTE_URL_SUBMISSIONS
      : ROUTE_URL_ARTICLES,
    apiRoute: locationPathname.includes(ROUTE_URL_SUBMISSIONS)
      ? ROUTE_API_SUBMISSIONS
      : ROUTE_API_ARTICLES
  }
}
