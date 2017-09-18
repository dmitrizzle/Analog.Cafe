// tools
import axios from "axios"
import errorMessages from "../constants/messages/errors"
import { axiosRequest } from "./helpers"

import { ROUTE_LIST_API, ROUTE_AUTHENTICATED_LIST_API } from "../constants/list"

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
      !request.url.includes(ROUTE_LIST_API) &&
      !request.url.includes(ROUTE_AUTHENTICATED_LIST_API)
    )
      return

    // get current state from store
    let listState = getState().list

    // do not load list more than once, escape loops
    if (
      listState.requested.url === request.url &&
      listState.requested.params.tag === request.params.tag &&
      listState.requested.params.author === request.params.author &&
      listState.requested.params.page === request.params.page
    )
      return

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
        else {
          dispatch(
            initPage({
              error: errorMessages.VIEW_TEMPLATE.LIST
            })
          )
        }
      })
      .catch(error => {
        dispatch(
          initPage({
            error: errorMessages.VIEW_TEMPLATE.LIST
          })
        )
      })
  }
}
