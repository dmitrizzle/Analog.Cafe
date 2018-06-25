import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import { NavLink, NavLogoLink } from "./NavLinks"
import NavAvatar from "./NavAvatar"
import NavComposer from "./NavComposer"
import NavConnectionStatus from "./NavConnectionStatus"
import NavGeneral from "./NavGeneral"
import NavItem from "./NavItem"
import NavLogo from "./NavLogo"
import NavMore from "./NavMore"
import NavWrapper from "./NavWrapper"

it("Render NavAvatar without crashing", () => {
  shallow(<NavAvatar />)
})

it("Render NavComposer without crashing", () => {
  shallow(<NavComposer />)
})

it("Render NavConnectionStatus without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <NavConnectionStatus />
    </ThemeProvider>
  )
})

it("Render NavGeneral without crashing", () => {
  shallow(<NavGeneral />)
})

it("Render NavItem without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <NavItem />
    </ThemeProvider>
  )
})

it("Render NavLink without crashing", () => {
  shallow(<NavLink />)
})
it("Render NavLogoLink without crashing", () => {
  shallow(<NavLogoLink />)
})

it("Render NavLogo without crashing", () => {
  shallow(<NavLogo />)
})

it("Render NavMore without crashing", () => {
  shallow(<NavMore />)
})

it("Render NavWrapper without crashing", () => {
  shallow(<NavWrapper />)
})
