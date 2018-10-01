import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import Bleed from "./Bleed"
import ListBlock from "./ListBlock"
import ListBrandName from "./ListBrandName"
import ListCaption from "./ListCaption"
import ListDescription from "./ListDescription"
import ListDescriptionWrapper from "./ListDescriptionWrapper"
import ListHeader from "./ListHeader"
import ListItemAuthorDate from "./ListItemAuthorDate"
import ListItemStats, { Stats, readingTime } from "./ListItemStats"
import ListLoader from "./ListLoader"
import ListUL from "./ListUL"
import HowToSubmit from "./HowToSubmit"
import ZigZagPicture from "./ZigZagPicture"

it("Render Bleed, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <Bleed />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ListBlock, matches snapshot", () => {
  const element = shallow(<ListBlock items={[{ id: 0 }]} />)
  expect(element).toMatchSnapshot()
})

it("Render ListBrandName, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ListBrandName />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ListCaption, matches snapshot", () => {
  const element = shallow(
    <ListCaption
      item={{
        status: "published",
        title: "",
        summary: ""
      }}
    />
  )
  expect(element).toMatchSnapshot()
})

it("Render ListDescription, matches snapshot", () => {
  const element = shallow(
    <ListDescription
      user={{
        connection: { status: "online" }
      }}
      list={{
        filter: {
          tags: []
        }
      }}
      renderedListMeta={{
        title: ""
      }}
    />
  )
  expect(element).toMatchSnapshot()
})

it("Render ListDescriptionWrapper, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ListDescriptionWrapper />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ListHeader, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ListHeader />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ListItemAuthorDate, matches snapshot", () => {
  const element = shallow(
    <ListItemAuthorDate
      item={{
        authors: [{ name: "" }],
        date: { published: "" }
      }}
    />
  )
  expect(element).toMatchSnapshot()
})

it("Render ListItemStats, matches snapshot", () => {
  const element = shallow(
    <ListItemStats
      item={{
        type: "placeholder"
      }}
    />
  )
  expect(element).toMatchSnapshot()
})
it("Render Stats, matches snapshot", () => {
  const element = shallow(<Stats theme={APP_THEME} />)
  expect(element).toMatchSnapshot()
})
it("Calculate reading time correctly", () => {
  expect(readingTime({ words: 250, images: 2 })).toEqual(2)
})

it("Render ListLoader, matches snapshot", () => {
  const element = shallow(<ListLoader />)
})

it("Render ListUL, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ListUL />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render HowToSubmit, matches snapshot", () => {
  const element = shallow(<HowToSubmit />)
  expect(element).toMatchSnapshot()
})

it("Render ZigZagPicture, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ZigZagPicture />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
