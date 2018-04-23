import { META_URLS } from "../constants/messages-list"
import {
  ROUTE_API_LIST,
  ROUTE_FILTERS,
  ROUTE_TAGS
} from "../constants/routes-list"

export const getListMeta = (pathname = "/", page = 1, url = ROUTE_API_LIST) => {
  let request
  let meta
  page = parseInt(page, 0)

  // filter by author name
  if (pathname.includes("/author/")) {
    meta = META_URLS["/author/*"]
    request = {
      params: {
        author: pathname.match(/\/author\/(.*)/)[1],
        page
      },
      url
    }
  } else {
    // filter by tags
    meta = META_URLS[pathname] ? META_URLS[pathname] : META_URLS.default
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
