import { HOST_API } from "../../constants"
import { ROUTE_URL_USER_LANDING } from "../../user/constants/routes-session"

export const ROUTE_API_LIST = HOST_API + "/list"
export const ROUTE_API_LIST_SUBMISSIONS = HOST_API + "/submissions"

export const ROUTE_TAGS = {
  [ROUTE_URL_USER_LANDING]: "",
  "/focus": "focus",
  "/perspective": "perspective",
  "/film-cameras": "film-cameras",
  "/editorials": "editorial",
  "/unclassifieds": "unclassifieds",
  "/photo-stories": "focus:perspective",
  [ROUTE_URL_USER_LANDING]: "",
  "/": ""
}
export const ROUTE_FILTERS = {
  "/collaborations": "collaboration",
  "/solo-projects": "solo"
}
