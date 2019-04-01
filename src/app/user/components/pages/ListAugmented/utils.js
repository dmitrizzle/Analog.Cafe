import React from "react"

import { TEXT_EMOJIS } from "../../../../constants"
import Heart from "../../../../core/components/icons/group-beacons/Heart"

export const ListPageTitle = function(view) {
  switch (view) {
    case "USER_DASHBOARD":
      return `Hi ${this.props.user.info.title}👋`
    case "USER_FAVOURITES":
      return (
        <span>
          <Heart style={{ color: "#ed236e", height: ".75em" }} />
        </span>
      )
    default:
      return this.props.list.author
        ? this.props.list.author.title
        : TEXT_EMOJIS.HUG_RIGHT
  }
}
export const ListPageSubtitle = function(view) {
  switch (view) {
    case "USER_DASHBOARD":
      return null
    case "USER_FAVOURITES":
      return null
    default:
      return !this.props.list.author
        ? "Loading…"
        : this.props.list.author.subtitle
  }
}
