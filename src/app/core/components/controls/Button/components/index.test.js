import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import {
  FacebookLinkButton,
  InstagramLinkButton,
  TwitterLinkButton
} from "./SocialButtons"
import Button from "./Button"
import ButtonGroup from "./ButtonGroup"
import ButtonGroupDivider from "./ButtonGroupDivider"
import ButtonKeyword from "./ButtonKeyword"
import ButtonStripItem from "./ButtonStripItem"
import LinkButton from "./LinkButton"
import TinyButton from "./TinyButton"

it("Render Button without crashing", () => {
  shallow(<Button />)
})

it("Render ButtonGroup without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ButtonGroup />
    </ThemeProvider>
  )
})

it("Render ButtonGroupDivider without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ButtonGroupDivider />
    </ThemeProvider>
  )
})

it("Render ButtonKeyword without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ButtonKeyword />
    </ThemeProvider>
  )
})

it("Render ButtonStripItem without crashing", () => {
  shallow(<ButtonStripItem />)
})

it("Render LinkButton without crashing", () => {
  shallow(<LinkButton />)
})

it("Render TwitterLinkButton without crashing", () => {
  shallow(<TwitterLinkButton />)
})
it("Render FacebookLinkButton without crashing", () => {
  shallow(<FacebookLinkButton />)
})
it("Render InstagramLinkButton without crashing", () => {
  shallow(<InstagramLinkButton />)
})

it("Render TinyButton without crashing", () => {
  shallow(<TinyButton />)
})
