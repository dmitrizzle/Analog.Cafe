// NOTE: `className` props are used in index.html
import React from "react"

import { LabelWithSearchSVG } from "./NavGeneral"
import Modal from "../../Modal"
import Search from "../../../icons/Search"

export default props => {
  return (
    <Modal
      element={props.element}
      branded={props.branded}
      inverse={props.inverse}
      unmarked
      with={{
        info: {
          search: true,
          menu: false,
          title: (
            <LabelWithSearchSVG>
              <Search /> Search
            </LabelWithSearchSVG>
          )
        },
        id: "nav/search"
      }}
      style={{ textDecoration: "none", paddingRight: ".25em" }}
    >
      {props.children}
    </Modal>
  )
}
