// NOTE: `className` props are used in index.html
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"

import { BurgerMenu } from "./NavGeneral"
import { ROUTE_URL_USER_LANDING } from "../../../../../user/constants/routes-session"
import { TEXT_LABELS } from "../../../../constants/messages-"
import Modal from "../../Modal"

const NAV_USER = [
  {
    to: "/submit/compose",
    text:
      loadTextContent().length > 0
        ? "Continue Editing Submission"
        : "Compose New Submission"
  },
  {
    to: ROUTE_URL_USER_LANDING,
    text: "My Submissions"
  },
  {
    to: "/profile/edit",
    text: "Edit Profile"
  },

  {
    to: "/sign-out",
    text: "Sign Out",
    inverse: true
  }
]

const NAV_VISITOR = [
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
  { divider: true },
  //
  // {
  //   to: "/collaborations",
  //   text: "Collaborations"
  // },
  // {
  //   to: "/solo-projects",
  //   text: "Solo Projects"
  // },
  // { divider: true },
  {
    to: "/about",
    text: "About Analog.Cafe"
  },
  {
    to: "/submit",
    text: "Submissions"
  },
  {
    to: "/subscribe",
    text: TEXT_LABELS.SUBSCRIBE,
    inverse: true
  }
]

export default props => {
  let buttons = props.userStatus === "ok" ? NAV_USER : NAV_VISITOR
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
    <Modal
      element={props.element}
      branded={props.branded}
      inverse={props.inverse}
      unmarked
      with={{
        info: {
          search: true,
          menu: true,
          title: (
            <span>
              <BurgerMenu /> Menu
            </span>
          ),
          buttons
        },
        id: "nav/more"
      }}
      style={{ textDecoration: "none", paddingRight: ".25em" }}
    >
      {props.children}
    </Modal>
  )
}
