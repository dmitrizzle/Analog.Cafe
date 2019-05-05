// NOTE: `className` props are used in index.html
import React from "react"

import { BurgerMenu } from "../../../pages/List/components/ListDescription"
import { LabelWithSearchSVG } from "./NavGeneral"
import { NavModal } from "./NavMore"

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
              <BurgerMenu /> Menu
            </LabelWithSearchSVG>
          )
        },
        id: "nav/find"
      }}
      style={{ textDecoration: "none", paddingRight: ".25em" }}
    >
      {props.children}
    </NavModal>
  )
}
