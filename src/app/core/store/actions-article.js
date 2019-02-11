import axios from "axios"

import { CARD_ERRORS } from "../constants/messages-"
import { HEADER_ERRORS, TEXT_ERRORS } from "../../constants"
import {
  ROUTE_API_ARTICLES,
  ROUTE_API_SUBMISSIONS
} from "../constants/routes-article"
import { makeAPIRequest } from "../../utils"

export const setArticlePage = page => {
  return {
    type: "ARTICLE.SET_PAGE",
    payload: page
  }
}
export const initArticlePage = state => {
  return {
    type: "ARTICLE.INIT_PAGE",
    payload: state
  }
}
// export const setArticleSelectoin = state => {
//   return {
//     type: "ARTICLE.SET_SELECTION",
//     payload: state
//   }
// }

export const fetchArticlePage = request => {
  return (dispatch, getState) => {
    if (
      !request.url.includes(ROUTE_API_ARTICLES) &&
      !request.url.includes(ROUTE_API_SUBMISSIONS)
    )
      return
    let articleState = getState().article
    if (articleState.requested.url === request.url) return
    if (request.url.includes(articleState.slug))
      dispatch(
        initArticlePage({
          requested: request,
          title: articleState.title,
          subtitle: articleState.subtitle,
          authors: articleState.authors,
          poster: articleState.poster,
          tag: articleState.tag
        })
      )
    else dispatch(initArticlePage())
    const token = localStorage.getItem("token")
    if (token)
      request.headers = {
        Authorization: "JWT " + token
      }
    axios(makeAPIRequest(request))
      .then(response => {
        response.data.content && response.data.content.raw
          ? dispatch(setArticlePage(response.data))
          : dispatch(
              initArticlePage({
                title: CARD_ERRORS.ARTICLE.title,
                subtitle: CARD_ERRORS.ARTICLE.subtitle,
                error: TEXT_ERRORS.CODE_204.error
              })
            )
      })
      .catch(error => {
        dispatch(
          initArticlePage({
            title: HEADER_ERRORS.ARTICLE.title,
            subtitle: HEADER_ERRORS.ARTICLE.subtitle,
            error
          })
        )
      })
  }
}

export const updateArticleStatus = request => {
  return dispatch => {
    const token = localStorage.getItem("token")
    if (token)
      request.headers = {
        Authorization: "JWT " + token
      }
    axios(makeAPIRequest(request))
      .then(response => {
        response.data.status
          ? dispatch({
              type: "ARTICLE.SET_STATUS",
              payload: response.data.status
            })
          : console.log("Failed updating article status")
      })
      .catch(error => {
        console.log(error)
      })
  }
}
