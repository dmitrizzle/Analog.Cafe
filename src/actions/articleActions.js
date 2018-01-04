// tools
import axios from "axios"
import errorMessages from "../constants/messages/errors"
import { axiosRequest } from "../utils/axios-request"

import { ROUTE_ARTICLE_API, ROUTE_SUBMISSION_API } from "../constants/article"

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
      !request.url.includes(ROUTE_ARTICLE_API) &&
      !request.url.includes(ROUTE_SUBMISSION_API)
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

    axios(axiosRequest(request))
      .then(response => {
        response.data.content && response.data.content.raw
          ? dispatch(setPage(response.data))
          : dispatch(
              initPage({
                title: errorMessages.VIEW_TEMPLATE.ARTICLE.title,
                subtitle: errorMessages.VIEW_TEMPLATE.ARTICLE.subtitle,
                error: errorMessages.DISAMBIGUATION.CODE_204.error
              })
            )
      })
      .catch(error => {
        dispatch(
          initPage({
            title: errorMessages.VIEW_TEMPLATE.ARTICLE.title,
            subtitle: errorMessages.VIEW_TEMPLATE.ARTICLE.subtitle,
            error
          })
        )
      })
  }
}
