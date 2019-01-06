import {
  ROUTE_API_LIST,
  ROUTE_API_LIST_SUBMISSIONS,
  ROUTE_FILTERS,
  ROUTE_TAGS
} from "../constants/routes-list"
import { ROUTE_URL_USER_LANDING } from "../../user/constants/routes-session"
import { TEXT_ROUTE_LABELS } from "../constants/messages-list"

export const getListMeta = (pathname = "/", page = 1) => {
  const url = pathname.includes(ROUTE_URL_USER_LANDING)
    ? ROUTE_API_LIST_SUBMISSIONS
    : ROUTE_API_LIST
  let request
  let meta
  page = parseInt(page, 0)

  if (pathname.includes("/author/")) {
    meta = TEXT_ROUTE_LABELS["/author/*"]
    request = {
      params: {
        author: pathname.match(/\/author\/(.*)/)[1],
        page
      },
      url
    }
  } else {
    meta = TEXT_ROUTE_LABELS[pathname]
      ? TEXT_ROUTE_LABELS[pathname]
      : TEXT_ROUTE_LABELS.default
    request = {
      params: {
        tag: ROUTE_TAGS[pathname] ? ROUTE_TAGS[pathname] : "",
        authorship: ROUTE_FILTERS[pathname] ? ROUTE_FILTERS[pathname] : "",
        page
      },
      url
    }
  }
  return { request, meta }
}
