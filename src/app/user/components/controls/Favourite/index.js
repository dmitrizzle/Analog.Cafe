import { connect } from "react-redux"
import React from "react"

import {
  addFavourite,
  deleteFavourite,
  isFavourite
} from "../../../store/actions-favourites"
import Link from "../../../../core/components/controls/Link"

export const FavouriteButton = props => {
  const isNotUserFavourited =
    !props.favourites[props.article.id] ||
    (props.favourites[props.article.id] &&
      props.favourites[props.article.id].user === 0)
  // console.log("props.favourites", props.favourites);
  // console.log("props.article.id", props.article.id);
  console.log(
    "props.favourites[props.article.id]",
    props.favourites[props.article.id]
  )

  return isNotUserFavourited ? (
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
      Like
    </Link>
  ) : (
    <Link
      to="#"
      onClick={event => {
        event.preventDefault()
        props.deleteFavourite(props.article.id)
      }}
    >
      Unlike
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
