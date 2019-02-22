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
  &.active,
  &:active {
    ${navActiveCss};
    > div > div {
      background-color: ${props => props.theme.color.background()};
    }
    svg path {
      stroke: ${props => props.theme.color.background()};
    }
  }

  ${props =>
    props.special &&
    `
    padding-right: 0.25em !important;
    box-shadow: ${props.theme.color.foreground()} 0 0 0 1px;
    border: 3px double transparent;
    background-clip: padding-box !important;
    border-radius: 0.33em !important;
  `};
`

const STANDARD_SET = []

const NAV_USER = props => [
  {
    to: ROUTE_URL_USER_LANDING,
    text: (
      <span>
        <NavAvatar image={props.userImage} /> My Profile
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
      special
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
    >
      {props.children}
    </NavModal>
  )
}
