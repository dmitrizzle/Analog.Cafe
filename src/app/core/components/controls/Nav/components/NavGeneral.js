// NOTE: `className` props are used in index.html
import React from "react"

import { NavLink, NavLogoLink } from "./NavLinks"
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
    return window.location.pathname === to
  }
  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
      <NavItem prime left mobile className="prime left mobile">
        <NavLink to={"/photo-stories"}>
          <span>Photo Stories</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          to={"/perspective"}
          className={isActive("/photo-stories") ? "active" : undefined}
        >
          <span>Perspective</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          to={"/focus"}
          className={isActive("/photo-stories") ? "active" : undefined}
        >
          <span>Focus</span>
        </NavLink>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavLogoLink to={"/"} className="indexRouteLink">
          <NavLogo />
        </NavLogoLink>
      </NavItem>
      <NavItem narrow prime left className="left">
        <NavLink to={"/film-cameras"}>Film Cameras</NavLink>
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
