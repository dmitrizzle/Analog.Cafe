import axios from "axios"

import { CARD_ERRORS } from "../constants/messages-"
import { HEADER_ERRORS } from "../../user/constants/messages-submission"
import { ROUTE_API_AUTHORS } from "../constants/routes-article"
import {
  ROUTE_API_LIST,
  ROUTE_API_LIST_SUBMISSIONS
} from "../constants/routes-list"
import { makeAPIRequest } from "../../utils"

export const setListPage = (page, appendItems) => {
  if (appendItems === false)
    return {
      type: "LIST.SET_PAGE",
      payload: page
    }
  else
    return {
      type: "LIST.ADD_PAGE",
      payload: page
    }
}
export const initListPage = state => {
  return {
    type: "LIST.INIT_PAGE",
    payload: state
  }
}
export const setListAuthor = author => {
  return {
    type: "LIST.SET_AUTHOR",
    payload: author
  }
}

export const fetchListPage = (request, appendItems = false) => {
  console.log(1)
  return (dispatch, getState) => {
    if (
      !request.url.includes(ROUTE_API_LIST) &&
      !request.url.includes(ROUTE_API_LIST_SUBMISSIONS)
    )
      return
    let listState = getState().list
    if (
      listState.requested.url === request.url &&
      listState.requested.params.tag === request.params.tag &&
      listState.requested.params.authorship === request.params.authorship &&
      listState.requested.params.author === request.params.author &&
      listState.requested.params.page === request.params.page
    )
      return
    if (request.url.includes(ROUTE_API_LIST_SUBMISSIONS))
      request.headers = {
        Authorization: "JWT " + localStorage.getItem("token")
      }
    if (!appendItems)
      dispatch(
        initListPage({
          requested: request
        })
      )
    axios(makeAPIRequest(request))
      .then(response => {
        const listAuthor =
          (response.data &&
            response.data.filter &&
            response.data.filter.author &&
            response.data.filter.author.id) ||
          null

        if (
          response.data.page["items-total"] > 0 ||
          request.url.includes(ROUTE_API_LIST_SUBMISSIONS)
        ) {
          if (listAuthor)
            dispatch(
              fetchListAuthor(
                listAuthor,
                setListPage(response.data, appendItems)
              )
            )
          if (request.url.includes(ROUTE_API_LIST_SUBMISSIONS)) {
            dispatch(
              fetchListAuthor(
                getState().user.info.id,
                setListPage(response.data, appendItems)
              )
            )
            response.data.page["items-total"] === 0 &&
              initListPage({
                error: HEADER_ERRORS.LIST
              })
          } else {
            dispatch(setListAuthor(undefined))
            dispatch(setListPage(response.data, appendItems))
          }
        } else {
          dispatch(
            initListPage({
              error: CARD_ERRORS.LIST
            })
          )
        }
      })
      .catch(() => {
        dispatch(
          initListPage({
            error: CARD_ERRORS.LIST
          })
        )
      })
  }
}

export const fetchListAuthor = (id, callback) => {
  return dispatch => {
    axios(makeAPIRequest({ url: `${ROUTE_API_AUTHORS}/${id}` }))
      .then(response => {
        dispatch(setListAuthor(response.data.info))
        dispatch(callback)
      })
      .catch(() => {
        dispatch(
          initListPage({
            error: CARD_ERRORS.LIST
          })
        )
      })
  }
}
