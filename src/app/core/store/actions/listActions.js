import axios from "axios"

import { CARD_ERRORS } from "../../constants/messages-"
import { CARD_ERRORS as CARD_ERRORS_SUBMISSIONS } from "../../../user/constants/messages-submissions"
import {
  ROUTE_API_LIST,
  ROUTE_API_LIST_SUBMISSIONS
} from "../../constants/routes-list"
import { axiosRequest } from "../../utils/axios-request"

// return
export const setPage = (page, appendItems) => {
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
export function initPage(state) {
  return {
    type: "LIST.INIT_PAGE",
    payload: state
  }
}

export const fetchPage = (request, appendItems = false) => {
  return (dispatch, getState) => {
    // do not load anything outside of API scope
    if (
      !request.url.includes(ROUTE_API_LIST) &&
      !request.url.includes(ROUTE_API_LIST_SUBMISSIONS)
    )
      return

    // get current state from store
    let listState = getState().list

    // do not load list more than once, escape loops
    if (
      listState.requested.url === request.url &&
      listState.requested.params.tag === request.params.tag &&
      listState.requested.params.authorship === request.params.authorship &&
      listState.requested.params.author === request.params.author &&
      listState.requested.params.page === request.params.page
    )
      return

    // authenticate user should they want to see protected content
    // (i.e. thieir submissions)
    if (request.url.includes(ROUTE_API_LIST_SUBMISSIONS))
      request.headers = {
        Authorization: "JWT " + localStorage.getItem("token")
      }

    // reset list state (unless it's being paginated)
    if (!appendItems)
      dispatch(
        initPage({
          requested: request
        })
      )
    axios(axiosRequest(request))
      .then(response => {
        if (response.data.page["items-total"] > 0)
          dispatch(setPage(response.data, appendItems))
        else if (request.url.includes(ROUTE_API_LIST_SUBMISSIONS)) {
          dispatch(
            initPage({
              error: CARD_ERRORS_SUBMISSIONS.LIST
            })
          )
        } else {
          dispatch(
            initPage({
              error: CARD_ERRORS.LIST
            })
          )
        }
      })
      .catch(() => {
        dispatch(
          initPage({
            error: CARD_ERRORS.LIST
          })
        )
      })
  }
}
