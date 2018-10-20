import {
  getHumanDatestamp,
  getISODatestamp,
  getTitleFromSlug
} from "./messages-"

it("Convert slug with no ID to title", () =>
  expect(getTitleFromSlug("isaan-on-a-cloud")).toEqual("Isaan on a Cloud"))
it("Convert slug with ID to title", () =>
  expect(
    getTitleFromSlug("isaan-on-a-cloud-ge1v", {
      trim: [0, -1]
    })
  ).toEqual("Isaan on a Cloud"))
it("Convert slug to text with no titlecase", () =>
  expect(getTitleFromSlug("isaan-on-a-cloud", { titleCase: false })).toEqual(
    "isaan on a cloud"
  ))
it("Convert slug to text with no title case but capitalized first letter", () =>
  expect(
    getTitleFromSlug("isaan-on-a-cloud", { titleCase: false, capitalize: true })
  ).toEqual("Isaan on a cloud"))

it("Convert UNIX time to human date", () =>
  expect(getHumanDatestamp(1529853719)).toEqual("June 24, 2018"))
it("Convert UNIX time to ISO date", () =>
  expect(getISODatestamp(1529853719)).toEqual("2018-06-24T15:21:59.000Z"))

// it("Don't say Hello twice in a row")
