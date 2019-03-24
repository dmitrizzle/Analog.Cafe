import React from "react"

import NavMini from "../../../../../core/components/controls/Nav/components/NavMini"

export default props => {
  switch (props.view) {
    case "USER_DASHBOARD":
      return <NavMini view="submissions" />
    case "USER_FAVOURITES":
      return <NavMini view="favourites" />
    default:
      if (props.list.author && props.user.info.id === props.list.author.id)
        return (
          <React.Fragment>
            <NavMini />
            This is how your profile looks to the general public{" "}
            <span style={{ fontStyle: "normal" }} role="img" aria-label="globe">
              🌎
            </span>
            . This page is shareable.
          </React.Fragment>
        )
      else return null
  }
}
