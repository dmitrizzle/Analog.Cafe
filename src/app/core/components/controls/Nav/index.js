import React from "react"

import {
  CARD_ALERTS,
  CARD_DIALOGUES
} from "../../../../user/constants/messages-submission"
import { CARD_DIALOGUES as CARD_DIALOGUES_ADMIN } from "../../../../admin/constants/messages-admin"
import Modal from "../Modal"
import { NavIndexLink, NavItem, NavLink, TinyImageInline } from "./styles"
import { makeFroth } from "../../../../utils"
import Logo from "../../icons/Logo"

// NOTE: components' `className` props are used in index.html and aren't required
// if styles from `./styles.js` have the comments removed

// return

// tiny profile image icon for logged-in users
const TinyImage = props => {
  return (
    <TinyImageInline>
      <img
        src={makeFroth({ src: props.image, size: "i" }).src}
        alt="Profile avatar"
      />
    </TinyImageInline>
  )
}

// Nav components
const NavLinkLabelMore = props => {
  return (
    <span>
      More… {props.userStatus === "ok" && <TinyImage image={props.userImage} />}
    </span>
  )
}
export const CommonNav = props => {
  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
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
        <Modal
          with={{
            info: {
              title: "More…",
              subscribeForm: props.userStatus !== "ok",
              buttons: [
                props.userStatus === "ok"
                  ? {
                      to: "/me",
                      text: "My Submissions",
                      branded: true
                    }
                  : null,
                props.userStatus === "ok"
                  ? {
                      to: "/me/edit",
                      text: "My Profile",
                      branded: true
                    }
                  : null,
                props.userRole === "admin"
                  ? {
                      to: "/me/admin",
                      text: "Admin",
                      branded: true
                    }
                  : null,
                props.userStatus === "ok"
                  ? {
                      to: "/sign-out",
                      text: "Sign Out",
                      inverse: true
                    }
                  : null,
                {
                  to: "/photo-essays",
                  text: "Photo Essays",
                  responsiveMobileOnly: true
                },
                {
                  to: "/editorials",
                  text: "Editorials"
                },
                {
                  to: "/guides",
                  text: "Guides"
                },
                {
                  to: "/reviews",
                  text: "Reviews"
                },
                {
                  to: "/stories",
                  text: "Stories"
                },
                { divider: true },
                {
                  to: "/collaborations",
                  text: "Collaborations"
                },
                {
                  to: "/solo-projects",
                  text: "Solo Projects"
                },
                { divider: true },
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
          <NavLinkLabelMore
            userStatus={props.userStatus}
            userImage={props.userImage}
          />
        </Modal>
      </NavItem>
    </ul>
  )
}

const NavLinkSendLabel = () => {
  return <span>Send</span>
}
const NavLinkSend = props => {
  return (
    <Modal
      with={
        props.editorStatus.id && props.userRole === "admin"
          ? CARD_DIALOGUES_ADMIN.SAVE_EDITS
          : CARD_DIALOGUES.CONSENT
      }
      style={{ textDecoration: "none" }}
    >
      <NavLinkSendLabel />
    </Modal>
  )
}

export const ComposerNav = props => {
  return (
    <ul>
      <NavItem status prime left className="prime left">
        <Modal with={CARD_ALERTS.AUTO_SAVE} style={{ textDecoration: "none" }}>
          {props.composerStatus === "ok" && <span>Draft Saved</span>}
          {props.composerStatus === "pending" && <span>Saving…</span>}
          {!props.composerStatus && <span>Draft</span>}
        </Modal>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavIndexLink to={"/"} className="indexRouteLink">
          <Logo />
        </NavIndexLink>
      </NavItem>
      <NavItem prime right className="prime right">
        <NavLinkSend
          userStatus={props.userStatus}
          userRole={props.userRole}
          editorStatus={props.editorStatus}
        />
      </NavItem>
    </ul>
  )
}
