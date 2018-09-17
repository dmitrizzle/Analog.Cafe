import { shallow } from "enzyme"
import React from "react"
import "jest-styled-components"

import ArticleActions, { dateFactory } from "./"

it("Render ArticleActions, matches snapshot", () => {
  const element = shallow(<ArticleActions />)
  expect(element).toMatchSnapshot()
})
it("Produces correct date format", () => {
  expect(dateFactory(1529853719)).toEqual({
    unix: 1529853719,
    iso: "2018-06-24T15:21:59.000Z",
    human: "June 24, 2018",
    lunar: "24☾6"
  })
})
