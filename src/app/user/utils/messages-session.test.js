import { anonymizeEmail, validateEmail } from "./messages-session"

it("Validate email", () => {
  expect(validateEmail("asdf")).toEqual(false)
  expect(validateEmail("as@@@df")).toEqual(false)
  expect(validateEmail("as@@@df.com")).toEqual(false)
  expect(validateEmail("as@df.com")).toEqual(true)
  expect(validateEmail("a@website.ca")).toEqual(true)
})

it("Anonymize email", () => {
  expect(anonymizeEmail("dmitrizzle@fochizzle.manizzle")).toEqual(
    "d***e@fochizzle.manizzle"
  )
  expect(anonymizeEmail("d@fochizzle.manizzle")).toEqual(
    "d***d@fochizzle.manizzle"
  )
})
