// NOTE: `className` props are used in index.html
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"
import styled, { css } from "styled-components"

import { GA } from "../../../../../utils"
import { NavLink, navActiveCss } from "./NavLinks"
import { ROUTE_URL_USER_LANDING } from "../../../../../user/constants/routes-session"
import { buttonMaker } from "../../../forms/Search"
import Modal from "../../Modal"
import NavAvatar from "./NavAvatar"

const accountCss = css`
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
    props.theme.size.breakpoint.min.l`
    padding-right: 0.25em !important;
    box-shadow: ${props.theme.color.foreground()} 0 0 0 1px;
    border: 3px double transparent;
    background-clip: padding-box !important;
    border-radius: 0.33em !important;
  `};
`
export const NavModal = styled(Modal)`
  ${accountCss};
`
const NavAccountLink = styled(NavLink)`
  ${accountCss};
`

const NAV_USER = props => [
  {
    to: ROUTE_URL_USER_LANDING,
    text: <span>❀ My Profile</span>
  },
  {
    to: "/submit/compose",
    text: props.hasDraft ? "✏︎ Edit Draft" : "✏︎ New Submission"
  },
  buttonMaker("/sign-out"),
  props.userRole === "admin"
    ? buttonMaker("/admin", { attributes: { branded: true } })
    : null
]

export default props => {
  return props.userStatus === "ok" ? (
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
              <NavAvatar image={props.userImage} /> My Account
            </span>
          ),
          buttons: NAV_USER({
            ...props,
            hasDraft: loadTextContent().length > 0
          })
        },
        id: "nav/account"
      }}
    >
      {props.children}
    </NavModal>
  ) : (
    <NavAccountLink
      special
      to="/sign-in"
      onClick={() => {
        GA.event({
          category: "Navigation",
          action: "Nav.click",
          label: "Account"
        })
      }}
    >
      {props.children}
    </NavAccountLink>
  )
}
