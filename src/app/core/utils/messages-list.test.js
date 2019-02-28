import { ROUTE_API_LIST } from "../constants/routes-list"
import { TEXT_ROUTE_LABELS } from "../constants/messages-list"
import { getListMeta } from "./messages-list"

it("Generate meta content for list", () =>
  expect(getListMeta("/", 1)).toEqual({
    meta: TEXT_ROUTE_LABELS["/"],
    request: {
      params: {
        authorship: "",
        page: 1,
        tag: ""
      },
      url: ROUTE_API_LIST
    }
  }))
it("Generate meta content for list of author's works", () =>
  expect(getListMeta("/is/dmitrizzle", 1)).toEqual({
    meta: TEXT_ROUTE_LABELS["/is/*"],
    request: {
      params: {
        author: "dmitrizzle",
        page: 1
      },
      url: ROUTE_API_LIST
    }
  }))
