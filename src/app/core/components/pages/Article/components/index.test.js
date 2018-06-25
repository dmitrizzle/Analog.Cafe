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

it("Render ArticleHeader without crashing", () => {
  shallow(<ArticleHeader article={{ title: "" }} />)
})

it("Render ArticleLoader without crashing", () => {
  shallow(<ArticleLoader />)
})

it("Render ArticleQuote without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ArticleQuote />
    </ThemeProvider>
  )
})

it("Render ArticleSection without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ArticleSection />
    </ThemeProvider>
  )
})

it("Render ArticleWrapper without crashing", () => {
  shallow(<ArticleWrapper />)
})

it("Render TimeStamp without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <TimeStamp />
    </ThemeProvider>
  )
})
