import {
  getAuthorListStringFromArray,
  getFirstNameFromFull,
  getLeadAuthorObject
} from "./messages-author"

it("Extract first name from full name", () =>
  expect(getFirstNameFromFull("Dmitrizzle Foschizzle")).toEqual("Dmitrizzle"))
it("Extract first name from full and shorten", () =>
  expect(getFirstNameFromFull("Dmitrizzle Fochizzle", 4)).toEqual("Dmi…"))

it("Create a string from array of author objects", () => {
  expect(
    getAuthorListStringFromArray([
      { name: "dmitrizzle", authorship: "article" },
      { name: "Betty" }
    ])
  ).toEqual("dmitrizzle and Betty")
  expect(
    getAuthorListStringFromArray([
      { name: "dmitrizzle", authorship: "article" },
      { name: "Betty" },
      { name: "John" },
      { name: "Anne" }
    ])
  ).toEqual("dmitrizzle, Betty, John, and Anne")
})
it("Create a trimmed string from array of author objects", () =>
  expect(
    getAuthorListStringFromArray(
      [
        { name: "dmitrizzle", authorship: "article" },
        { name: "Betty" },
        { name: "Anne" },
        { name: "John" },
        { name: "Lewis" }
      ],
      { trim: true }
    )
  ).toEqual("dmitrizzle and Betty +3"))
it("Create a string from array of author objects with full names", () =>
  expect(
    getAuthorListStringFromArray(
      [
        { name: "dmitrizzle", authorship: "article" },
        { name: "Betty Pretty" },
        { name: "Anne Joanne" }
      ],
      { keepFullNames: true }
    )
  ).toEqual("dmitrizzle, Betty Pretty, and Anne Joanne"))
it("Create a string from array of author objects, ommit lead author", () =>
  expect(
    getAuthorListStringFromArray(
      [
        { name: "dmitrizzle", authorship: "article" },
        { name: "Betty Pretty" },
        { name: "Anne Joanne" }
      ],
      { ommitLeadAuthor: true }
    )
  ).toEqual("Betty and Anne"))
it("Print lead author's first name from array of author objects", () =>
  expect(
    getAuthorListStringFromArray(
      [
        { name: "dmitrizzle fochizzle", authorship: "article" },
        { name: "Betty Pretty", authorship: "photography" },
        { name: "Anne Joanne", authorship: "photography" }
      ],
      { onlyLeadAuthor: true }
    )
  ).toEqual("dmitrizzle"))

it("Get lead author object from array of author objects", () =>
  expect(
    getLeadAuthorObject([
      { name: "dmitrizzle fochizzle", authorship: "article" },
      { name: "Betty Pretty", authorship: "photography" },
      { name: "Anne Joanne", authorship: "photography" }
    ])
  ).toEqual({ name: "dmitrizzle fochizzle", authorship: "article" }))
