// NOTE: `className` props are used in index.html
import React from "react"
import styled from "styled-components"

import { BurgerMenu } from "../../../pages/List/components/ListDescription"
import { GA } from "../../../../../utils"
import { NavLink, NavLogoLink } from "./NavLinks"
import Cube from "../../../icons/group-beacons/Cube"
import NavItem from "./NavItem"
import NavLogo from "./NavLogo"
import NavSearch from "./NavSearch"
import NavSections from "./NavSections"

export const LabelWithSearchSVG = styled.span`
  svg {
    width: 1em;
    margin: -0.25em 0.15em 0 0;
    z-index: 1;
    position: relative;
    path {
      stroke: ${props =>
        props.inverse
          ? props.theme.color.background()
          : props.theme.color.foreground()};
      stroke-width: 2;
    }
  }
`

export const NotOnMicroScreens = styled.span`
  ${props => props.theme.size.breakpoint.max.s`
  display: none;
`};
`
export const OnlyMicroScreens = styled.span`
  ${props => props.theme.size.breakpoint.min.m`
    display: none;
  `};
`
export const Extra = styled.span`
  ${props => props.theme.size.breakpoint.max.l`
    display: none;
  `};
`
export const Condensed = styled.span`
  ${props => props.theme.size.breakpoint.min.xl`
    display: none;
  `};
`

export const isActiveUrl = (to, options = {}, props) => {
  const currentUrl = options.modalUrl
    ? props.modalUrl
    : window.location.pathname

  if (options.modalUrl && props.isModalHidden) return false
  if (currentUrl === to) return true
  return false
}

export default props => {
  const a = "active"
  const ab = "/about"
  const mr = "/features"
  // const s = "/submissions";

  const features = {
    to: mr,
    className: isActiveUrl(mr) ? a : undefined
  }
  const navTopics = {
    className: isActiveUrl("nav/topics", { modalUrl: true }, props)
      ? a
      : undefined
  }

  const navSearch = {
    className: isActiveUrl("nav/find", { modalUrl: true }, props)
      ? a
      : undefined
  }
  // const navMore = {
  //   className: (isActiveUrl("nav/account", { modalUrl: true }, props)
  //   ? "active"
  //   : undefined)
  //     ? a
  //     : undefined
  // };

  const navAbout = {
    to: ab,
    className: isActiveUrl(ab) ? a : undefined
  }

  const iconStyles = { height: "1em", paddingBottom: ".15em" }

  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
      <NavItem prime left className="prime left">
        <NavLink
          {...features}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "Features"
            })
          }}
        >
          Features
          <NotOnMicroScreens>
            {" "}
            <Cube style={iconStyles} />
          </NotOnMicroScreens>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavSections
          {...navTopics}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "Topics"
            })
          }}
        >
          Topics
          {/* <Extra>
            {" "}
            <Pen style={iconStyles} />
          </Extra> */}
        </NavSections>
        {/* )} */}
      </NavItem>

      <NavItem prime center className="prime center">
        <NavLogoLink
          to={"/"}
          className="indexRouteLink"
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "Logo"
            })
          }}
        >
          <NavLogo />
        </NavLogoLink>
      </NavItem>

      <NavItem>
        <NavLink
          {...navAbout}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "About"
            })
          }}
        >
          About
        </NavLink>
      </NavItem>

      <NavItem narrow prime right className="prime right">
        <NavSearch
          {...navSearch}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "Find"
            })
          }}
        >
          Menu{" "}
          <BurgerMenu
            inverse={isActiveUrl("nav/find", { modalUrl: true }, props)}
          />{" "}
        </NavSearch>
      </NavItem>
    </ul>
  )
}
