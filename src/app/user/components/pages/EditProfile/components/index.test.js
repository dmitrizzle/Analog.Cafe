import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import ProfileButton from "./ProfileButton"
import ProfileCaption from "./ProfileCaption"
import ProfileCard from "./ProfileCard"
import ProfileHeader from "./ProfileHeader"

it("Render ProfileButton, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ProfileButton />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ProfileCaption, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ProfileCaption />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render ProfileCard, matches snapshot", () => {
  const element = shallow(<ProfileCard />)
  expect(element).toMatchSnapshot()
})

it("Render ProfileHeader, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <ProfileHeader />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
