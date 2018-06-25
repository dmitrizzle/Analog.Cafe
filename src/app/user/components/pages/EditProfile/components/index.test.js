import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import ProfileButton from "./ProfileButton"
import ProfileCaption from "./ProfileCaption"
import ProfileCard from "./ProfileCard"
import ProfileHeader from "./ProfileHeader"

it("Render ProfileButton without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ProfileButton />
    </ThemeProvider>
  )
})

it("Render ProfileCaption without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ProfileCaption />
    </ThemeProvider>
  )
})

it("Render ProfileCard without crashing", () => {
  shallow(<ProfileCard />)
})

it("Render ProfileHeader without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <ProfileHeader />
    </ThemeProvider>
  )
})
