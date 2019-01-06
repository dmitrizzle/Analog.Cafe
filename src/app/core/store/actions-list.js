import axios from "axios"

import { CARD_ERRORS } from "../constants/messages-"
import { ROUTE_API_AUTHORS } from "../constants/routes-article"
import {
  ROUTE_API_LIST,
  ROUTE_API_LIST_SUBMISSIONS
} from "../constants/routes-list"
import { makeAPIRequest } from "../../utils"

export const setListPage = (page, appendItems) => {
  //console.log(3, page);
  console.log("setListPage")
  const type = `LIST.${!appendItems ? "SET" : "ADD"}_PAGE`
  return {
    type,
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
  console.log("setListAuthor")
  return {
    type: "LIST.SET_AUTHOR",
    payload: author
  }
}

export const fetchListPage = (request, appendItems = false) => {
  return (dispatch, getState) => {
    const listState = getState().list
    const isSubmissions = url => url.includes(ROUTE_API_LIST_SUBMISSIONS)

    // console.log(6, listState);
    if (!request.url.includes(ROUTE_API_LIST) && !isSubmissions(request.url))
      return

    if (
      listState.requested.url === request.url &&
      listState.requested.params.page === request.params.page &&
      listState.requested.params.tag === request.params.tag
      // listState.requested.params.authorship === request.params.authorship ||
      // listState.requested.params.author === request.params.author ||
      // listState.requested.params.page === request.params.page
    )
      return

    if (isSubmissions(request.url) !== isSubmissions(listState.requested.url)) {
      dispatch(initListPage())
    }

    if (isSubmissions(request.url))
      request.headers = {
        Authorization: "JWT " + localStorage.getItem("token")
      }

    axios(makeAPIRequest(request))
      .then(response => {
        const listAuthor =
          (response.data &&
            response.data.filter &&
            response.data.filter.author &&
            response.data.filter.author.id) ||
          null
        const payload = { ...response.data, requested: request }

        if (
          response.data.page["items-total"] === 0 &&
          !isSubmissions(request.url)
        ) {
          dispatch(
            initListPage({
              error: CARD_ERRORS.LIST
            })
          )
          return
        }

        if (listAuthor) {
          dispatch(fetchListAuthor(listAuthor, payload, appendItems))
          return
        }
        if (isSubmissions(request.url)) {
          // console.log(1, payload);
          dispatch(
            fetchListAuthor(getState().user.info.id, payload, appendItems)
          )
          return
        }
        dispatch(setListAuthor(undefined))
        // console.log(payload);
        dispatch(setListPage(payload, appendItems))
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

export const fetchListAuthor = (authorId, payload, listAppendItems) => {
  const request = { url: `${ROUTE_API_AUTHORS}/${authorId}` }

  return dispatch => {
    axios(makeAPIRequest(request))
      .then(response => {
        dispatch(setListAuthor(response.data.info))
        // console.log(2, payload);
        dispatch(setListPage(payload, listAppendItems))
      })
      .catch(() =>
        initListPage({
          error: CARD_ERRORS.LIST
        })
      )
  }
}
