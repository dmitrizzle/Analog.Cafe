// NOTE: `className` props are used in index.html
import React from "react"
import styled from "styled-components"

import { BurgerMenu } from "../../../pages/List/components/ListDescription"
import { GA } from "../../../../../utils"
import { NavLink, NavLogoLink } from "./NavLinks"
import Cube from "../../../icons/group-beacons/Cube"
import NavAvatar from "./NavAvatar"
import NavItem from "./NavItem"
import NavLogo from "./NavLogo"
import NavMore from "./NavMore"
import NavSearch from "./NavSearch"
import Pen from "../../../icons/group-beacons/Pen"

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
  const mr = "/features"
  const s = "/submissions"

  const features = {
    to: mr,
    className: isActiveUrl(mr) ? a : undefined
  }
  const submit = {
    className: isActiveUrl(s) ? a : undefined
  }

  const navSearch = {
    className: isActiveUrl("nav/find", { modalUrl: true }, props)
      ? a
      : undefined
  }
  const navMore = {
    className: (isActiveUrl("nav/account", { modalUrl: true }, props)
    ? "active"
    : undefined)
      ? a
      : undefined
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
          Feature
          <NotOnMicroScreens>s</NotOnMicroScreens>
          <Extra>
            {" "}
            <Cube style={iconStyles} />
          </Extra>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          {...submit}
          to={props.userStatus !== "ok" ? "/submit" : s}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "Submissions"
            })
          }}
        >
          Submi
          <NotOnMicroScreens>ssions </NotOnMicroScreens>
          <OnlyMicroScreens>t</OnlyMicroScreens>
          <Extra>
            {" "}
            <Pen style={iconStyles} />
          </Extra>
        </NavLink>
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
        <NavMore
          userImage={props.userImage}
          userStatus={props.userStatus}
          userRole={props.userRole}
          {...navMore}
        >
          <Extra>My </Extra>
          <NotOnMicroScreens>Account </NotOnMicroScreens>
          <OnlyMicroScreens>Me </OnlyMicroScreens>
          <NavAvatar image={props.userImage} />
        </NavMore>
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
