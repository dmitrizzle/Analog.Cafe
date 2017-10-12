// tools
import React from "react"

// components
import Logo from "../Logo"
import { ModalDispatch } from "../../containers/Modal"

import { ROUTE_AUTH_USER_LANDING } from "../../../constants/user"
import {
  MESSAGE_HINT_SUBMIT_CONSENT,
  MESSAGE_HINT_AUTO_SAVE
} from "../../../constants/messages/hints"

// styles
import { NavLink, NavIndexLink, NavItem } from "./styles"

// NOTE: components' `className` props are used in index.html and aren't required
// if styles from `./styles.js` have the comments removed

// return
export const CommonNav = props => {
  return (
    <ul>
      <NavItem>
        <NavLink to={"/photo-essays"}>
          <span>Photo Essays</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={"/articles"}>
          <span>Articles</span>
        </NavLink>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavIndexLink to={"/"} className="indexRouteLink">
          <Logo />
        </NavIndexLink>
      </NavItem>
      <NavItem prime right className="prime left">
        {props.userStatus === "ok" ? (
          <NavLink to={"/submit/compose"}>
            <span>Submit</span>
          </NavLink>
        ) : (
          <NavLink to={"/submit"}>
            <span>Submit</span>
          </NavLink>
        )}
      </NavItem>
      <NavItem prime left className="prime right">
        <ModalDispatch
          with={MESSAGE_HINT_AUTO_SAVE}
          style={{ textDecoration: "none", paddingRight: ".25em" }}
        >
          <span>More…</span>
        </ModalDispatch>
      </NavItem>
    </ul>
  )
}

const NavLinkSendLabel = () => {
  return <span>Send</span>
}
const NavLinkSend = props => {
  return (
    <ModalDispatch
      with={MESSAGE_HINT_SUBMIT_CONSENT}
      style={{ textDecoration: "none" }}
    >
      <NavLinkSendLabel />
    </ModalDispatch>
  )
}

export const ComposerNav = props => {
  return (
    <ul>
      <NavItem indicator prime left className="prime left">
        <ModalDispatch
          with={MESSAGE_HINT_AUTO_SAVE}
          style={{ textDecoration: "none" }}
        >
          <span>{props.draftStatus}</span>
        </ModalDispatch>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavIndexLink to={"/"} className="indexRouteLink">
          <Logo />
        </NavIndexLink>
      </NavItem>
      <NavItem prime right className="prime right">
        <NavLinkSend userStatus={props.userStatus} />
      </NavItem>
    </ul>
  )
}

export { NavWrapper } from "./styles"
