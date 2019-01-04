// NOTE: `className` props are used in index.html
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"

import { BurgerMenu } from "./NavGeneral"
import { ROUTE_URL_USER_LANDING } from "../../../../../user/constants/routes-session"
import { TEXT_LABELS } from "../../../../constants/messages-"
import Modal from "../../Modal"

const NAV_USER = hasDraft => [
  {
    to: ROUTE_URL_USER_LANDING,
    text: "My Profile"
  },
  {
    to: "/submit/compose",
    text: hasDraft ? "✏︎ Edit Draft" : "✏︎ New Submission"
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
  },
  {
    to: "/subscribe",
    text: TEXT_LABELS.SUBSCRIBE,
    inverse: true
  }
]

export default props => {
  let buttons =
    props.userStatus === "ok"
      ? NAV_USER(loadTextContent().length > 0)
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
    </Modal>
  )
}
