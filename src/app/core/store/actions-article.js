import axios from "axios"

import { CARD_ERRORS, TEXT_ERRORS } from "../constants/messages-"
import {
  ROUTE_API_ARTICLES,
  ROUTE_API_SUBMISSIONS
} from "../constants/routes-article"
import { makeAPIRequest } from "../../utils"

// return
export const setPage = page => {
  return {
    type: "ARTICLE.SET_PAGE",
    payload: page
  }
}
export const initPage = state => {
  return {
    type: "ARTICLE.INIT_PAGE",
    payload: state
  }
}

export const fetchPage = request => {
  return (dispatch, getState) => {
    // do not load anything outside of API scope
    if (
      !request.url.includes(ROUTE_API_ARTICLES) &&
      !request.url.includes(ROUTE_API_SUBMISSIONS)
    )
      return

    // get current state from store
    let articleState = getState().article

    // do not load article twice in a arow
    if (articleState.requested.url === request.url) return

    // pre-cook article title, when available
    // (if it matches actual requested article)
    if (request.url.includes(articleState.slug))
      dispatch(
        initPage({
          requested: request,
          title: articleState.title,
          subtitle: articleState.subtitle,
          authors: articleState.authors,
          poster: articleState.poster,
          tag: articleState.tag
        })
      )
    else dispatch(initPage())

    // add token to request, if available;
    // this is for viewing pending submissions
    const token = localStorage.getItem("token")
    if (token)
      request.headers = {
        Authorization: "JWT " + token
      }

    axios(makeAPIRequest(request))
      .then(response => {
        response.data.content && response.data.content.raw
          ? dispatch(setPage(response.data))
          : dispatch(
              initPage({
                title: CARD_ERRORS.ARTICLE.title,
                subtitle: CARD_ERRORS.ARTICLE.subtitle,
                error: TEXT_ERRORS.CODE_204.error
              })
            )
      })
      .catch(error => {
        dispatch(
          initPage({
            title: CARD_ERRORS.ARTICLE.title,
            subtitle: CARD_ERRORS.ARTICLE.subtitle,
            error
          })
        )
      })
  }
}

export const updateStatus = request => {
  return dispatch => {
    // add token to request, if available;
    // this is for viewing pending submissions
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
