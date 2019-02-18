// NOTE: `className` props are used in index.html
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"
import styled from "styled-components"

import { BurgerMenu } from "./NavGeneral"
import { ROUTE_URL_USER_LANDING } from "../../../../../user/constants/routes-session"
import { navActiveCss } from "./NavLinks"
import Modal from "../../Modal"
import NavAvatar from "./NavAvatar"

export const NavModal = styled(Modal)`
  &.active {
    ${navActiveCss};
    > div > div {
      background: ${props => props.theme.color.background()};
    }
    svg path {
      stroke: ${props => props.theme.color.background()};
    }
  }
`

const STANDARD_SET = [
  {
    to: "/resources",
    text: (
      <span>
        <span style={{ color: "#ed236e" }}>✯</span> Resources{" "}
        <span style={{ color: "#ed236e" }}>✯</span>
      </span>
    )
  },
  {
    to: "https://www.etsy.com/ca/shop/AnalogCafeShop",
    text: (
      <span>
        <span style={{ color: "#ed236e" }}>Etsy</span> Store
      </span>
    )
  },
  { divider: true },
  {
    to: "/photo-essays",
    text: "Photo Essays"
  },
  {
    to: "/film-photography",
    text: "Film Photography"
  },
  {
    to: "/editorials",
    text: "Editorials"
  },
  {
    to: "/solo-projects",
    text: "Solo Projects"
  },
  { to: "/collaborations", text: "Collaborations" },
  { divider: true },
  { to: "/privacy-policy", text: "Privacy" },
  { to: "/submit/rules", text: "Rules" },
  { divider: true },
  {
    to: "/about",
    text: "About"
  }
]

const NAV_USER = props => [
  {
    to: ROUTE_URL_USER_LANDING,
    text: (
      <span>
        <NavAvatar
          image={props.userImage}
          style={{
            width: "1em",
            height: "1em",
            marginBottom: "-.1em",
            boxShadow: "0 0 0 1px"
          }}
        />{" "}
        My Profile
      </span>
    )
  },
  {
    to: "/submit/compose",
    text: props.hasDraft ? "✏︎ Edit Draft" : "✏︎ New Submission"
  },
  { divider: true },
  ...STANDARD_SET,
  {
    to: "/sign-out",
    text: "Sign Out",
    inverse: true
  }
]

const NAV_VISITOR = [
  ...STANDARD_SET,
  {
    to: "/sign-in",
    text: "Sign In"
  },
  {
    to: "/submit",
    text: "Get Published"
  }
]

export default props => {
  let buttons =
    props.userStatus === "ok"
      ? NAV_USER({
          userImage: props.userImage,
          hasDraft: loadTextContent().length > 0
        })
      : NAV_VISITOR
  if (props.userRole === "admin")
    buttons = [
      ...buttons,
      {
        to: "/admin",
        text: "Admin",
        branded: true
      }
    ]
  return (
    <NavModal
      {...props}
      unmarked
      with={{
        info: {
          search: true,
          socialButtons: true,
          menu: true,
          title: (
            <span>
              <BurgerMenu /> More
            </span>
          ),
          buttons
        },
        id: "nav/more"
      }}
      style={{ textDecoration: "none", paddingRight: ".25em" }}
    >
      {props.children}
    </NavModal>
  )
}
