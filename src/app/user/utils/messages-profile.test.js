import {
  LINK_LABELS,
  fixLinks,
  getProfileButtons,
  linkToLabel
} from "./messages-profile"

it("Assign website name to URL", () => {
  expect(linkToLabel("https://twitter.com/dmitrizzle")).toEqual(
    LINK_LABELS.twitter
  )
  expect(linkToLabel("https://www.instagram.com/dmitrizzle")).toEqual(
    LINK_LABELS.instagram
  )
  expect(linkToLabel("facebook.com/dmitrizzle")).toEqual(LINK_LABELS.facebook)
  expect(linkToLabel("flickr.com/dmitrizzle")).toEqual(LINK_LABELS.flickr)
  expect(linkToLabel("500px.com/dmitrizzle")).toEqual(LINK_LABELS.px)
  expect(linkToLabel("500px.com/dmitrizzle")).toEqual(LINK_LABELS.px)
  expect(linkToLabel("https://plus.google.com/dmitrizzle")).toEqual(
    LINK_LABELS.gplus
  )
  expect(linkToLabel("https://www.google.com")).toEqual(LINK_LABELS.website)
})

it("Fix mistyped links", () => {
  expect(fixLinks("google.com")).toEqual("http://google.com")
})
it("Ignore empty mistyped links", () => {
  expect(fixLinks()).toEqual("")
  expect(fixLinks("")).toEqual("")
})

it("Generate user profile buttons template", () => {
  expect(getProfileButtons("dmitrizzle", "https://google.com")).toEqual([
    {
      to: "/author/dmitrizzle",
      text: "View Full Profile",
      branded: true
    },
    {
      to: "https://google.com",
      text: LINK_LABELS.website
    }
  ])
})
