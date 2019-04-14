import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { GA } from "../../../../utils"
import {
  addFavourite,
  deleteFavourite,
  isFavourite
} from "../../../store/actions-favourites"
import { addSessionInfo, getSessionInfo } from "../../../store/actions-user"
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
      to={props.user.status !== "ok" ? "/sign-in" : "#❤︎"}
      title="Add this article to your Favourites"
      onClick={event => props.user.status === "ok" && event.preventDefault()}
      onMouseDown={event => {
        if (props.user.status === "ok") event.preventDefault()
        // set return routes when user signs in
        else
          return props.addSessionInfo({
            loginSuccess: `/zine/${props.article.slug}`
          })

        GA.event({
          category: "User",
          action: "Favourite",
          label: `/zine/${props.article.slug}`
        })

        props.addFavourite({
          id: props.article.id,
          slug: props.article.slug
        })

        const tipsViewed = props.user.sessionInfo.tipsViewed || []
        if (!tipsViewed[0]) {
          props.addSessionInfo({
            tipsViewed: [...tipsViewed, "ADD_TO_FAVOURITES"]
          })
          // window.requestAnimationFrame(() => props.getSessionInfo());
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
              )
            }
          })
        }
      }}
    >
      <Heart />
    </Like>
  ) : (
    <Unlike
      to={props.user.status !== "ok" ? "/sign-in" : "#❤︎"}
      title="Remove this article from your Favourites"
      onClick={event => props.user.status === "ok" && event.preventDefault()}
      onMouseDown={event => {
        if (props.user.status === "ok") event.preventDefault()
        // set return routes when user signs in
        else
          return props.addSessionInfo({
            loginSuccess: `/zine/${props.article.slug}`
          })

        GA.event({
          category: "User",
          action: "UnFavourite",
          label: `/zine/${props.article.slug}`
        })

        props.deleteFavourite(props.article.id)
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
