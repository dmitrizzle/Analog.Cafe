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
    z-index: 1;
    position: relative;
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

  const ve = "/photo-essay"
  const su = "/submit"
  const sc = "/subscribe"
  const fp = "/film-photography"

  const visualEssays = {
    to: "/photo-essays",
    className: isActive(ve) ? a : undefined
  }
  const submit = {
    to: su,
    className: isActive(su) ? a : undefined
  }
  const subscribe = {
    to: sc,
    className: isActive(sc) ? a : undefined
  }
  const filmPhotography = {
    to: fp,
    className: isActive(fp) ? a : undefined
  }

  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
      <NavItem prime left mobile className="prime left mobile">
        <NavLink {...visualEssays}>
          <span>Subscribe</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...visualEssays}>
          <span className="wide">Photo </span>
          Essays
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...filmPhotography}>
          <span className="wide">Film </span>
          Photography
        </NavLink>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavLogoLink to={"/"} className="indexRouteLink">
          <NavLogo />
        </NavLogoLink>
      </NavItem>
      <NavItem narrow prime left className="left">
        <NavLink {...submit}>Submit Yours</NavLink>
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
