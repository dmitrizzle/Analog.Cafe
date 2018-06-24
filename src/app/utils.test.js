import { makeAPIRequest } from "./utils"

it("Create API request template", () =>
  expect(makeAPIRequest({ url: "https://test.com" })).toEqual({
    method: "get",
    data: {},
    params: {},
    headers: {},
    url: "https://test.com"
  }))
