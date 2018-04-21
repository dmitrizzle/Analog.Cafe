// constants
import {
  ROUTE_APP_PRODUCTION_DOMAIN_NAME,
  ROUTE_APP_PRODUCTION_DOMAIN_PROTOCOL
} from "../../constants"
import {
  ROUTE_SUBMISSIONS_DIR,
  ROUTE_ARTICLE_DIR,
  ROUTE_SUBMISSION_API,
  ROUTE_ARTICLE_API
} from "../constants/article"

// return path type for submissions vs published works
export const locate = locationPathname => {
  return {
    pathname: locationPathname.includes(ROUTE_SUBMISSIONS_DIR)
      ? ROUTE_SUBMISSIONS_DIR
      : ROUTE_ARTICLE_DIR,
    apiRoute: locationPathname.includes(ROUTE_SUBMISSIONS_DIR)
      ? ROUTE_SUBMISSION_API
      : ROUTE_ARTICLE_API
  }
}

// generate complete url path for social sharing
export const completeUrlPath = (route, slug) => {
  return encodeURI(
    ROUTE_APP_PRODUCTION_DOMAIN_PROTOCOL +
      ROUTE_APP_PRODUCTION_DOMAIN_NAME +
      route +
      "/" +
      slug
  )
}
