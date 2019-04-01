import {
  ROUTE_API_LIST,
  ROUTE_API_LIST_FAVOURITES,
  ROUTE_API_LIST_SUBMISSIONS,
  ROUTE_FILTERS,
  ROUTE_TAGS
} from "../constants/routes-list"
import { ROUTE_URL_USER_SUBMISSIONS } from "../../user/constants/routes-session"
import { TEXT_ROUTE_LABELS } from "../constants/messages-list"

export const getListMeta = (pathname = "/", page = 1) => {
  let request
  let meta
  page = parseInt(page, 0)

  meta = TEXT_ROUTE_LABELS[pathname]
    ? TEXT_ROUTE_LABELS[pathname]
    : TEXT_ROUTE_LABELS.default
  request = {
    params: {
      tag: ROUTE_TAGS[pathname] ? ROUTE_TAGS[pathname] : "",
      authorship: ROUTE_FILTERS[pathname] ? ROUTE_FILTERS[pathname] : "",
      page
    },
    url: pathname.includes(ROUTE_URL_USER_SUBMISSIONS)
      ? ROUTE_API_LIST_SUBMISSIONS
      : ROUTE_API_LIST
  }

  if (pathname.includes("/is/")) {
    meta = TEXT_ROUTE_LABELS["/is/*"]
    request = {
      params: {
        author: pathname.match(/\/is\/(.*)/)[1],
        page
      },
      url: ROUTE_API_LIST
    }
  }
  if (pathname.includes("/favourites")) {
    meta = TEXT_ROUTE_LABELS["/favourites"]
    request = {
      params: {
        page
      },
      url: ROUTE_API_LIST_FAVOURITES
    }
  }
  return { request, meta }
}
