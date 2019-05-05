// NOTE: `className` props are used in index.html
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"
import styled, { css } from "styled-components"

import { GA } from "../../../../../utils"
import { NavLink, navActiveCss } from "./NavLinks"
import { RHCP } from "../../../icons/group-beacons/Star"
import { ROUTE_URL_USER_SUBMISSIONS } from "../../../../../user/constants/routes-session"
import { buttonMaker } from "../../../forms/Search"
import Cube from "../../../icons/group-beacons/Cube"
import Heart from "../../../icons/group-beacons/Heart"
import Modal from "../../Modal"
import NavAvatar from "./NavAvatar"
import Pen from "../../../icons/group-beacons/Pen"

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
`
export const NavModal = styled(Modal)`
  ${accountCss};
`
const NavAccountLink = styled(NavLink)`
  ${accountCss};
`

const iconStyles = { height: ".75em", paddingBottom: ".15em" }

const NAV_USER = props => [
  {
    to: ROUTE_URL_USER_SUBMISSIONS,
    text: (
      <span>
        <Pen style={iconStyles} /> Submissions
      </span>
    )
  },

  {
    to: "/favourites",
    text: (
      <span>
        <Heart style={iconStyles} /> Favourites
      </span>
    )
  },
  {
    to: `/profile/edit`,
    text: (
      <span>
        <RHCP style={iconStyles} /> Profile & Settings
      </span>
    )
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
      unmarked
      with={{
        info: {
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
