import { HOST_API } from "../../constants"
import { ROUTE_URL_USER_LANDING } from "../../user/constants/routes-session"

export const ROUTE_API_LIST = HOST_API + "/list"
export const ROUTE_API_LIST_SUBMISSIONS = HOST_API + "/submissions"

export const ROUTE_TAGS = {
  "/me": "",
  "/stories": "story",
  "/editorials": "editorial",
  "/guides": "guide",
  "/reviews": "review",
  "/photo-essays": "photo-essay",
  "/articles": "review:guide:editorial:story",
  [ROUTE_URL_USER_LANDING]: "",
  "/": ""
}
export const ROUTE_FILTERS = {
  "/collaborations": "collaboration",
  "/solo-projects": "solo"
}
