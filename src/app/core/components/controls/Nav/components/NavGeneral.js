// NOTE: `className` props are used in index.html
import React from "react"

import { NavLink, NavLogoLink } from "./NavLinks"
import { ROUTE_URL_ARTICLES } from "../../../../constants/routes-article"
import NavAvatar from "./NavAvatar"
import NavItem from "./NavItem"
import NavLogo from "./NavLogo"
import NavMore from "./NavMore"

const NavLinkLabelMore = props => {
  return (
    <span>
      More {props.userStatus === "ok" && <NavAvatar image={props.userImage} />}
    </span>
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
  const pe = "/perspective"
  const fo = "/focus"

  const photoStories = {
    to: ps,
    className: isActive(ps) || isActive(pe) || isActive(fo) ? a : undefined
  }
  const perspective = {
    to: pe,
    className: isActive(ps) || isActive(pe) ? a : undefined
  }
  const focus = {
    to: fo,
    className: isActive(ps) || isActive(fo) ? a : undefined
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
          <span>Photo Stories</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...perspective}>
          <span>Perspective</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...focus}>
          <span>Focus</span>
        </NavLink>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavLogoLink to={"/"} className="indexRouteLink">
          <NavLogo />
        </NavLogoLink>
      </NavItem>
      <NavItem narrow prime left className="left">
        <NavLink {...filmCameras}>Film Cameras</NavLink>
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
