import { connect } from "react-redux"
import React from "react"

import {
  addFavourite,
  deleteFavourite,
  isFavourite
} from "../../../store/actions-favourites"
import Heart from "../../../../core/components/icons/group-beacons/Heart"
import Link from "../../../../core/components/controls/Link"

export const FavouriteButton = props => {
  if (!props.favourites[props.article.id]) props.isFavourite(props.article.id)
  const isFavourite =
    props.favourites[props.article.id] &&
    props.favourites[props.article.id].user > 0

  return !isFavourite ? (
    <Link
      to="#"
      onClick={event => {
        event.preventDefault()
        props.addFavourite({
          id: props.article.id,
          slug: props.article.slug
        })
      }}
    >
      <Heart />
    </Link>
  ) : (
    <Link
      to="#"
      onClick={event => {
        event.preventDefault()
        props.deleteFavourite(props.article.id)
      }}
    >
      <Heart />
    </Link>
  )
}

const mapStateToProps = state => {
  return {
    article: state.article,
    user: state.user,
    favourites: state.favourites
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addFavourite: favourite => {
      dispatch(addFavourite(favourite))
    },
    deleteFavourite: id => {
      dispatch(deleteFavourite(id))
    },

    isFavourite: article => {
      dispatch(isFavourite(article))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouriteButton)
