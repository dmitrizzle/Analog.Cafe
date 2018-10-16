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
  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
      <NavItem>
        <NavLink to={"/tools"}>
          <span>Tools</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={"/culture"}>
          <span>Culture</span>
        </NavLink>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavLogoLink to={"/"} className="indexRouteLink">
          <NavLogo />
        </NavLogoLink>
      </NavItem>
      <NavItem narrow prime left className="prime left">
        <NavLink to={"/voices"}>Voices</NavLink>
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
