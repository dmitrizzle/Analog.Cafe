// NOTE: `className` props are used in index.html
import React from "react"

import Modal from "../../Modal"

export default props => {
  return (
    <Modal
      wrapperElement={props.wrapperElement}
      branded={props.branded}
      inverse={props.inverse}
      with={{
        info: {
          title: "More…",
          subscribeForm: props.userStatus !== "ok" || props.allItems,
          subscribeFormLocation: "NavGeneral",
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
              mobile: props.allItems ? null : "on"
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
              text: "About Analog.Cafe",
              mobile: props.allItems ? null : "off"
            },
            {
              to: "/submit",
              text: "Submit",
              mobile: props.allItems ? null : "on"
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
