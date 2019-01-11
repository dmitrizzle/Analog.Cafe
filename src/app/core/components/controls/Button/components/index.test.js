import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import {
  FacebookLinkButton,
  InstagramLinkButton,
  TwitterLinkButton,
  FeedlyLinkButton
} from "./SocialButtons"
import Button from "./Button"
import ButtonGroup from "./ButtonGroup"
import ButtonGroupDivider from "./ButtonGroupDivider"
import ButtonKeyword from "./ButtonKeyword"
import ButtonStripItem from "./ButtonStripItem"
import LinkButton from "./LinkButton"
import TinyButton from "./TinyButton"

it("Render Button, matches snapshot", () => {
  const element = shallow(<Button />)
  expect(element).toMatchSnapshot()
})

it("Render ButtonGroup, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ButtonGroup />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ButtonGroupDivider, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ButtonGroupDivider />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ButtonKeyword, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ButtonKeyword />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ButtonStripItem, matches snapshot", () => {
  const element = shallow(<ButtonStripItem />)
  expect(element).toMatchSnapshot()
})

it("Render LinkButton, matches snapshot", () => {
  const element = shallow(<LinkButton />)
  expect(element).toMatchSnapshot()
})

it("Render FeedlyLinkButton, matches snapshot", () => {
  const element = shallow(<FeedlyLinkButton />)
  expect(element).toMatchSnapshot()
})
it("Render TwitterLinkButton, matches snapshot", () => {
  const element = shallow(<TwitterLinkButton />)
  expect(element).toMatchSnapshot()
})
it("Render FacebookLinkButton, matches snapshot", () => {
  const element = shallow(<FacebookLinkButton />)
  expect(element).toMatchSnapshot()
})
it("Render InstagramLinkButton, matches snapshot", () => {
  const element = shallow(<InstagramLinkButton />)
  expect(element).toMatchSnapshot()
})

it("Render TinyButton, matches snapshot", () => {
  const element = shallow(<TinyButton />)
  expect(element).toMatchSnapshot()
})
