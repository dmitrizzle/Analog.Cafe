import { shallow } from "enzyme"
import React from "react"
import "jest-styled-components"

import ArticleActions, { dateFactory } from "./"

it("Render ArticleActions, matches snapshot", () => {
  const element = shallow(<ArticleActions />)
  expect(element).toMatchSnapshot()
})
it("Produces correct date format", () => {
  expect(dateFactory(1533704857)).toEqual({
    unix: 1533704857,
    iso: "2018-08-08T05:07:37.000Z",
    human: "August 7, 2018",
    lunar: "7☾8"
  })
})
