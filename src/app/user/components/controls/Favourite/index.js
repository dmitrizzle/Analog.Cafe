import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import {
  addFavourite,
  deleteFavourite,
  isFavourite
} from "../../../store/actions-favourites"
import { addSessionInfo, getSessionInfo } from "../../../store/actions-user"
import { isForbidden } from "../../../utils/actions-session"
import { setModal } from "../../../../core/store/actions-modal"
import Heart from "../../../../core/components/icons/group-beacons/Heart"
import Link from "../../../../core/components/controls/Link"

export const Like = styled(Link)`
  display: block;
  margin: 1.5em 0 0.5em;

  svg {
    height: 1.5em;
    stroke: rgba(237, 35, 110, 1);
    stroke-width: 2px;
    overflow: visible;
    path {
      fill: #fff;
    }
  }
  :active {
    background: #fff !important;
  }
`
export const Unlike = styled(Link)`
  display: block;
  margin: 1.5em 0 0.5em;

  svg {
    height: 1.5em;
    overflow: visible;
    path {
      fill: rgba(237, 35, 110, 1);
    }
  }
  :active {
    background: #fff !important;
  }
`

export const FavouriteButton = props => {
  if (!props.favourites[props.article.id]) props.isFavourite(props.article.id)
  const isFavourite =
    props.favourites[props.article.id] &&
    props.favourites[props.article.id].user > 0

  return !isFavourite ? (
    <Like
      to="#❤︎"
      title="Add this article to your Favourites"
      onClick={event => event.preventDefault()}
      onMouseDown={event => {
        event.preventDefault()

        if (props.user.status !== "ok") return isForbidden(null, props)

        props.addFavourite({
          id: props.article.id,
          slug: props.article.slug
        })

        const tipsViewed = props.user.sessionInfo.tipsViewed || []
        !tipsViewed.includes("ADD_TO_FAVOURITES") &&
          props.setModal({
            info: {
              title: "Added to Favourites",
              text: (
                <span>
                  <strong style={{ fontStyle: "normal" }}>
                    “{props.article.title}”
                  </strong>{" "}
                  has now been added to your personal{" "}
                  <strong>
                    <Link to="/favourites">favourites</Link>
                  </strong>{" "}
                  list.
                </span>
              ),
              buttons: [
                {
                  branded: true,
                  to: "/favourites",
                  text: "See your Favourites"
                },

                {
                  to: "#got-it",
                  onClick: event => {
                    event.preventDefault()
                    props.addSessionInfo({
                      tipsViewed: [...tipsViewed, "ADD_TO_FAVOURITES"]
                    })
                    window.requestAnimationFrame(() => props.getSessionInfo())
                  },
                  text: "Don’t Show This Again",
                  inverse: true
                }
              ]
            }
          })
      }}
    >
      <Heart />
    </Like>
  ) : (
    <Unlike
      to="#❤︎"
      title="Remove this article from your Favourites"
      onClick={event => event.preventDefault()}
      onMouseDown={event => {
        event.preventDefault()
        props.deleteFavourite(props.article.id)

        const tipsViewed = props.user.sessionInfo.tipsViewed || []
        !tipsViewed.includes("REMOVE_FROM_FAVOURITES") &&
          props.setModal({
            info: {
              title: "Removed from Favourites",
              text: (
                <span>
                  This article has now been removed from your favourites.
                </span>
              ),
              buttons: [
                {
                  to: "#got-it",
                  onClick: event => {
                    event.preventDefault()
                    props.addSessionInfo({
                      tipsViewed: [...tipsViewed, "REMOVE_FROM_FAVOURITES"]
                    })
                    window.requestAnimationFrame(() => props.getSessionInfo())
                  },
                  text: "Don’t Show This Again",
                  inverse: true
                }
              ]
            }
          })
      }}
    >
      <Heart />
    </Unlike>
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
    },
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    },
    addSessionInfo: sessionInfo => {
      dispatch(addSessionInfo(sessionInfo))
    },
    getSessionInfo: () => {
      dispatch(getSessionInfo())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouriteButton)
