import { ROUTE_FILTERS, ROUTE_META, ROUTE_LIST_API } from "../constants/list"

export const getListMeta = (pathname = "/", page = 1, url = ROUTE_LIST_API) => {
  let request
  let meta
  page = parseInt(page, 0)

  // filter by author name
  if (pathname.includes("/author/")) {
    meta = ROUTE_META["/author/*"]
    request = {
      params: {
        author: pathname.match(/\/author\/(.*)/)[1],
        page
      },
      url
    }
  } else {
    // filter by tags
    meta = ROUTE_META[pathname] ? ROUTE_META[pathname] : ROUTE_META.default
    request = {
      params: {
        tag: ROUTE_FILTERS[pathname] ? ROUTE_FILTERS[pathname] : "",
        page
      },
      url
    }
  }

  return { request, meta }
}

export const trimAuthorName = (name, maxlength = 10) => {
  let firstName = name.split(" ")[0]
  return firstName.length > maxlength
    ? firstName.substr(0, maxlength - 1) + "…"
    : firstName
}
export const authorNameList = (authors, trim) => {
  if (!authors) return null

  const namesTotal = authors.length
  const punctuation = (namesTotal, count) => {
    if (namesTotal > 2 && count < namesTotal - 1) {
      return count === namesTotal - 2 ? ", and " : ", "
    } else if (count < namesTotal - 1) return " and "
  }

  let names = []
  let compiledNameList = ""

  authors.forEach(object => {
    names.push(trimAuthorName(object.name, 15))
  })

  if (!trim)
    for (let count = 0; count < namesTotal; count++) {
      compiledNameList += names[count]
      compiledNameList += punctuation(namesTotal, count)
    }
  else
    compiledNameList +=
      names[0] +
      (namesTotal > 1 ? ` and ${names[1]}` : "") +
      (namesTotal > 2 ? ` +${namesTotal - 2}` : "")
  return compiledNameList
}
