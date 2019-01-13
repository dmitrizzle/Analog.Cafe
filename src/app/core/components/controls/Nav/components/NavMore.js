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
  {
    to: "/about",
    text: "About Analog.Cafe"
  },
  {
    to: "/sign-out",
    text: "Sign Out",
    inverse: true
  }
]

const NAV_VISITOR = [
  {
    to: "/about",
    text: "About Analog.Cafe"
  },
  {
    to: "/submit",
    text: "Submissions"
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
          subscribe: props.userStatus !== "ok",
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
