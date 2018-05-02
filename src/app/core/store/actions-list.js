import axios from "axios"

import { CARD_ERRORS } from "../constants/messages-"
import { CARD_ERRORS as CARD_ERRORS_SUBMISSIONS } from "../../user/constants/messages-submission"
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
export function initListPage(state) {
  return {
    type: "LIST.INIT_PAGE",
    payload: state
  }
}

export const fetchListPage = (request, appendItems = false) => {
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
        if (response.data.page["items-total"] > 0)
          dispatch(setListPage(response.data, appendItems))
        else if (request.url.includes(ROUTE_API_LIST_SUBMISSIONS)) {
          dispatch(
            initListPage({
              error: CARD_ERRORS_SUBMISSIONS.LIST
            })
          )
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
