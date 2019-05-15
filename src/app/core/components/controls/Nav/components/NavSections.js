// NOTE: `className` props are used in index.html
import { withRouter } from "react-router-dom"
import React from "react"

import { NavModal } from "./NavMore"
import { magazineSections } from "../../../pages/List/components/ListDescription"

export default withRouter(props => {
  return (
    <NavModal
      {...props}
      unmarked
      with={{ ...magazineSections(props.location.pathname) }}
      style={{ textDecoration: "none" }}
    >
      {props.children}
    </NavModal>
  )
})
