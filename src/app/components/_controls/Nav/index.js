// tools
import React from "react"
import { froth } from "../../../../utils/image-froth"

// components
import Logo from "../../_icons/Logo"
import { ModalDispatch } from "../../../containers/Modal"

import {
  MESSAGE_HINT_SUBMIT_CONSENT,
  MESSAGE_HINT_SUBMIT_EDITORS,
  MESSAGE_HINT_AUTO_SAVE
} from "../../../../constants/messages/hints"

// styles
import { NavLink, NavIndexLink, NavItem, TinyImageInline } from "./styles"

// NOTE: components' `className` props are used in index.html and aren't required
// if styles from `./styles.js` have the comments removed

// return

// tiny profile image icon for logged-in users
const TinyImage = props => {
  return (
    <TinyImageInline>
      <img
        src={froth({ src: props.image, size: "i" }).src}
        alt="Profile avatar"
      />
    </TinyImageInline>
  )
}

// Nav components
export const CommonNav = props => {
  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
      <NavItem>
        <NavLink to={"/photo-essays"} connectionStatus={props.connectionStatus}>
          <span>Photo Essays</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={"/articles"} connectionStatus={props.connectionStatus}>
          <span>Articles</span>
        </NavLink>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavIndexLink
          to={"/"}
          className="indexRouteLink"
          connectionStatus={props.connectionStatus}
        >
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
          with={{
            info: {
              title: "More…",
              buttons: [
                props.userStatus === "ok" &&
                props.connectionStatus !== "offline"
                  ? {
                      to: "/me",
                      text: "My Submissions",
                      red: true
                    }
                  : null,
                props.userStatus === "ok" &&
                props.connectionStatus !== "offline"
                  ? {
                      to: "/me/edit",
                      text: "My Profile",
                      red: true
                    }
                  : null,
                props.userStatus === "ok"
                  ? {
                      to: "/sign-out",
                      text: "Sign Out",
                      black: true
                    }
                  : null,
                props.connectionStatus !== "offline" && {
                  to: "/photo-essays",
                  text: "Photo Essays",
                  responsiveMobileOnly: true
                },
                props.connectionStatus !== "offline" && {
                  to: "/editorials",
                  text: "Editorials"
                },
                props.connectionStatus !== "offline" && {
                  to: "/guides",
                  text: "Guides"
                },
                props.connectionStatus !== "offline" && {
                  to: "/reviews",
                  text: "Reviews"
                },
                props.connectionStatus !== "offline" && {
                  to: "/stories",
                  text: "Stories"
                },
                { divider: props.connectionStatus !== "offline" },
                props.connectionStatus !== "offline" && {
                  to: "/collaborations",
                  text: "Collaborations"
                },
                props.connectionStatus !== "offline" && {
                  to: "/solo-projects",
                  text: "Solo Projects"
                },
                { divider: props.connectionStatus !== "offline" },
                {
                  to: "/about",
                  text: "About Analog.Cafe"
                }
              ]
            },
            id: "nav/more"
          }}
          style={{ textDecoration: "none", paddingRight: ".25em" }}
        >
          <span>
            More…{" "}
            {props.userStatus === "ok" && <TinyImage image={props.userImage} />}
          </span>
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
      with={
        props.submissionStatus.id
          ? MESSAGE_HINT_SUBMIT_EDITORS
          : MESSAGE_HINT_SUBMIT_CONSENT
      }
      style={{ textDecoration: "none" }}
    >
      <NavLinkSendLabel />
    </ModalDispatch>
  )
}

export const ComposerNav = props => {
  return (
    <ul>
      <NavItem draftStatus prime left className="prime left">
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
        <NavLinkSend
          userStatus={props.userStatus}
          submissionStatus={props.submissionStatus}
        />
      </NavItem>
    </ul>
  )
}

export { NavWrapper } from "./styles"
export { Connection } from "./styles"
