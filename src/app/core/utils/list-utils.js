import {
  ROUTE_LIST_TAGS,
  ROUTE_LIST_FILTERS,
  MESSAGE_META_LIST_URLS,
  ROUTE_API_LIST
} from "../constants/list"

export const getListMeta = (pathname = "/", page = 1, url = ROUTE_API_LIST) => {
  let request
  let meta
  page = parseInt(page, 0)

  // filter by author name
  if (pathname.includes("/author/")) {
    meta = MESSAGE_META_LIST_URLS["/author/*"]
    request = {
      params: {
        author: pathname.match(/\/author\/(.*)/)[1],
        page
      },
      url
    }
  } else {
    // filter by tags
    meta = MESSAGE_META_LIST_URLS[pathname]
      ? MESSAGE_META_LIST_URLS[pathname]
      : MESSAGE_META_LIST_URLS.default
    request = {
      params: {
        tag: ROUTE_LIST_TAGS[pathname] ? ROUTE_LIST_TAGS[pathname] : "",
        authorship: ROUTE_LIST_FILTERS[pathname]
          ? ROUTE_LIST_FILTERS[pathname]
          : "",
        page
      },
      url
    }
  }

  return { request, meta }
}
