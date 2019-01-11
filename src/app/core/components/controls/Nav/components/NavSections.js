// NOTE: `className` props are used in index.html
import React from "react"

import { TEXT_LABELS } from "../../../../constants/messages-"
import Modal from "../../Modal"

const buttons = [
  {
    to: "/photo-essays",
    text: "Photo Essays"
  },
  {
    to: "/film-photography",
    text: "Film Photography"
  },
  {
    to: "/subscribe",
    text: TEXT_LABELS.SUBSCRIBE,
    branded: true
  }
]

export default props => {
  return (
    <Modal
      unmarked
      with={{
        info: {
          search: true,
          menu: true,
          title: <span>◈ Sections</span>,
          buttons
        },
        id: "nav/sections"
      }}
      style={{ textDecoration: "none", paddingRight: ".25em" }}
    >
      {props.children}
    </Modal>
  )
}
