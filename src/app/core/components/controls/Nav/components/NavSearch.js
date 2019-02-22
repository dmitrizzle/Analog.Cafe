// NOTE: `className` props are used in index.html
import React from "react"

import { LabelWithSearchSVG } from "./NavGeneral"
import { NavModal } from "./NavMore"
import Search from "../../../icons/Search"

export default props => {
  return (
    <NavModal
      {...props}
      unmarked
      with={{
        info: {
          search: true,
          menu: false,
          socialButtons: true,
          title: (
            <LabelWithSearchSVG>
              <Search /> Find
            </LabelWithSearchSVG>
          )
        },
        id: "nav/search"
      }}
      style={{ textDecoration: "none", paddingRight: ".25em" }}
    >
      {props.children}
    </NavModal>
  )
}
