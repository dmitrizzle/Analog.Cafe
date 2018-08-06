import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import { NavLink, NavLogoLink } from "./NavLinks"
import FooterMicro from "./FooterMicro"
import NavAvatar from "./NavAvatar"
import NavComposer from "./NavComposer"
import NavConnectionStatus from "./NavConnectionStatus"
import NavGeneral from "./NavGeneral"
import NavItem from "./NavItem"
import NavLogo from "./NavLogo"
import NavMore from "./NavMore"
import NavWrapper from "./NavWrapper"

it("Render FooterMicro, matches snapshot", () => {
  const element = shallow(<FooterMicro />)
  expect(element).toMatchSnapshot()
})

it("Render NavAvatar, matches snapshot", () => {
  const element = shallow(<NavAvatar />)
  expect(element).toMatchSnapshot()
})

it("Render NavComposer, matches snapshot", () => {
  const element = shallow(<NavComposer />)
  expect(element).toMatchSnapshot()
})

it("Render NavConnectionStatus, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <NavConnectionStatus />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render NavGeneral, matches snapshot", () => {
  const element = shallow(<NavGeneral />)
  expect(element).toMatchSnapshot()
})

it("Render NavItem, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <NavItem />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render NavLink, matches snapshot", () => {
  const element = shallow(<NavLink />)
  expect(element).toMatchSnapshot()
})
it("Render NavLogoLink, matches snapshot", () => {
  const element = shallow(<NavLogoLink />)
  expect(element).toMatchSnapshot()
})

it("Render NavLogo, matches snapshot", () => {
  const element = shallow(<NavLogo />)
  expect(element).toMatchSnapshot()
})

it("Render NavMore, matches snapshot", () => {
  const element = shallow(<NavMore />)
  expect(element).toMatchSnapshot()
})

it("Render NavWrapper, matches snapshot", () => {
  const element = shallow(<NavWrapper />)
  expect(element).toMatchSnapshot()
})
