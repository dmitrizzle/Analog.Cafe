// NOTE: `className` props are used in index.html
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"

import { ROUTE_URL_USER_LANDING } from "../../../../../user/constants/routes-session"
import Modal from "../../Modal"

export default props => {
  return (
    <Modal
      element={props.element}
      branded={props.branded}
      inverse={props.inverse}
      with={{
        info: {
          title: "More ",
          buttons: [
            props.userStatus === "ok"
              ? {
                  to: ROUTE_URL_USER_LANDING,
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
            // {
            //   to: "/unclassifieds",
            //   text: "Unclassifieds"
            // },
            {
              to: "/collaborations",
              text: "Collaborations"
            },
            {
              to: "/solo-projects",
              text: "Solo Projects"
            },

            {
              to: "/editorials",
              text: "Editorials"
            },
            {
              to: "/about",
              text: "About Analog.Cafe"
            },
            {
              to: props.userStatus === "ok" ? "/submit/compose" : "/submit",
              text:
                loadTextContent().length > 0
                  ? "Continue With Submission"
                  : `Submit${props.userStatus === "ok" ? " New" : ""}`,
              branded: true
            }
          ]
        },
        id: "nav/more"
      }}
      style={{ textDecoration: "none", paddingRight: ".25em" }}
    >
      {props.children}
    </Modal>
  )
}
