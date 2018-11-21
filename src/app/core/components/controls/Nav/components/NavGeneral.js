// NOTE: `className` props are used in index.html
import React from "react"

import { NavLink, NavLogoLink } from "./NavLinks"
import { ROUTE_URL_ARTICLES } from "../../../../constants/routes-article"
import NavAvatar from "./NavAvatar"
import NavItem from "./NavItem"
import NavLogo from "./NavLogo"
import NavMore from "./NavMore"
import Search from "../../../icons/Search"
import styled from "styled-components"

export const LabelWithSearchSVG = styled.span`
  svg {
    width: 1em;
    margin: -0.25em 0.15em 0 0;
    path {
      stroke: ${props => props.theme.color.foreground()};
      stroke-width: 2;
    }
  }
`

const NavLinkLabelMore = props => {
  return (
    <LabelWithSearchSVG>
      <Search />
      {props.userStatus === "ok" && <NavAvatar image={props.userImage} />}
      More
    </LabelWithSearchSVG>
  )
}

export default props => {
  const isActive = to => {
    if (window.location.pathname === to) return true
    if (
      window.location.pathname.includes(ROUTE_URL_ARTICLES) &&
      props.articleTag === to.replace("/", "")
    )
      return true
    return false
  }

  const a = "active"
  const ps = "/photo-stories"
  const ar = "/art"
  const pl = "/places"

  const photoStories = {
    to: ps,
    className: isActive(ps) || isActive(ar) || isActive(pl) ? a : undefined
  }
  const art = {
    to: ar,
    className: isActive(ps) || isActive(ar) ? a : undefined
  }
  const places = {
    to: pl,
    className: isActive(ps) || isActive(pl) ? a : undefined
  }

  const fc = "/film-cameras"
  const filmCameras = {
    to: fc,
    className: isActive(fc) ? a : undefined
  }

  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
      <NavItem prime left mobile className="prime left mobile">
        <NavLink {...photoStories}>
          <span>Subscribe</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...photoStories}>
          <span className="wide">Photo </span>
          Stories
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...filmCameras}>Film Cameras</NavLink>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavLogoLink to={"/"} className="indexRouteLink">
          <NavLogo />
        </NavLogoLink>
      </NavItem>
      <NavItem narrow prime left className="left">
        <NavLink {...filmCameras}>Submit Yours</NavLink>
      </NavItem>
      <NavItem prime right className="prime right">
        <NavMore userStatus={props.userStatus} userRole={props.userRole}>
          <NavLinkLabelMore
            userStatus={props.userStatus}
            userImage={props.userImage}
          />
        </NavMore>
      </NavItem>
    </ul>
  )
}
