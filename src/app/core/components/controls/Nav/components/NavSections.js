// NOTE: `className` props are used in index.html
import React from "react"

import { NavModal } from "./NavMore"

const buttons = [
  {
    to: "/photo-essays",
    text: "Photo Essays"
  },
  {
    to: "/film-photography",
    text: "Film Photography"
  }
]

export default props => {
  return (
    <NavModal
      {...props}
      unmarked
      with={{
        info: {
          menu: true,
          title: <span>◈ Sections</span>,
          buttons
        },
        id: "nav/sections"
      }}
      style={{ textDecoration: "none" }}
    >
      {props.children}
    </NavModal>
  )
}
