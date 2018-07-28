import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import ArticleHeader from "./ArticleHeader"
import ArticleLoader from "./ArticleLoader"
import ArticleQuote from "./ArticleQuote"
import ArticleSection from "./ArticleSection"
import ArticleWrapper from "./ArticleWrapper"
import TimeStamp from "./TimeStamp"

it("Render ArticleHeader, matches snapshot", () => {
  const element = shallow(<ArticleHeader article={{ title: "" }} />)
  expect(element).toMatchSnapshot()
})

it("Render ArticleLoader, matches snapshot", () => {
  const element = shallow(<ArticleLoader />)
  expect(element).toMatchSnapshot()
})

it("Render ArticleQuote, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ArticleQuote />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ArticleSection, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ArticleSection />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ArticleWrapper, matches snapshot", () => {
  const element = shallow(<ArticleWrapper />)
  expect(element).toMatchSnapshot()
})

it("Render TimeStamp, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <TimeStamp />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
