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
import ListItemStats from "./ListItemStats"
import ListLoader from "./ListLoader"
import ListUL from "./ListUL"
import PlaceholderHowToSubmit from "./PlaceholderHowToSubmit"
import ZigZagPicture from "./ZigZagPicture"

it("Render Bleed without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <Bleed />
    </ThemeProvider>
  )
})

it("Render ListBlock without crashing", () => {
  shallow(<ListBlock items={[{ id: 0 }]} />)
})

it("Render ListBrandName without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ListBrandName />
    </ThemeProvider>
  )
})

it("Render ListCaption without crashing", () => {
  shallow(
    <ListCaption
      item={{
        status: "published",
        title: "",
        summary: ""
      }}
    />
  )
})

it("Render ListDescription without crashing", () => {
  shallow(
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
})

it("Render ListDescriptionWrapper without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ListDescriptionWrapper />
    </ThemeProvider>
  )
})

it("Render ListHeader without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ListHeader />
    </ThemeProvider>
  )
})

it("Render ListItemAuthorDate without crashing", () => {
  shallow(
    <ListItemAuthorDate
      item={{
        authors: [{ name: "" }],
        date: { published: "" }
      }}
    />
  )
})

it("Render ListItemStats without crashing", () => {
  shallow(
    <ListItemStats
      item={{
        type: "placeholder"
      }}
    />
  )
})

it("Render ListLoader without crashing", () => {
  shallow(<ListLoader />)
})

it("Render ListUL without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ListUL />
    </ThemeProvider>
  )
})

it("Render PlaceholderHowToSubmit without crashing", () => {
  shallow(<PlaceholderHowToSubmit />)
})

it("Render ZigZagPicture without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ZigZagPicture />
    </ThemeProvider>
  )
})
