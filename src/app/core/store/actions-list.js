import axios from "axios"

import { CARD_ERRORS } from "../constants/messages-"
import { ROUTE_API_AUTHORS } from "../constants/routes-article"
import {
  ROUTE_API_LIST,
  ROUTE_API_LIST_SUBMISSIONS
} from "../constants/routes-list"
import { makeAPIRequest } from "../../utils"

export const setListPage = (page, appendItems) => {
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
  return {
    type: "LIST.SET_AUTHOR",
    payload: author
  }
}

export const fetchListPage = (request, appendItems = false) => {
  console.log("request.url ", request.url)
  return (dispatch, getState) => {
    const listState = getState().list
    const isSubmissions = url => {
      // console.log("isSubmissions", url);
      return url.includes(ROUTE_API_LIST_SUBMISSIONS)
    }

    if (!request.url.includes(ROUTE_API_LIST) && !isSubmissions(request.url))
      return

    // console.log(listState, request);
    if (
      listState.requested.url === request.url &&
      listState.requested.params.page === request.params.page &&
      listState.requested.params.tag === request.params.tag
      // &&
      //
      // listState.requested.params.authorship === request.params.authorship &&
      // listState.requested.params.author === request.params.author &&
      // listState.requested.params.page === request.params.page
    )
      return

    if (isSubmissions(request.url))
      request.headers = {
        Authorization: "JWT " + localStorage.getItem("token")
      }
    if (isSubmissions(request.url) !== isSubmissions(listState.requested.url)) {
      console.log("initListPage 1")
      dispatch(initListPage())
    }

    const delay = setTimeout(() => {
      clearTimeout(delay)
      // console.log("request.url > delay", request.url);
      axios(makeAPIRequest(request))
        .then(response => {
          console.log("request.url > delay > axios", request.url)

          const listAuthor =
            (response.data &&
              response.data.filter &&
              response.data.filter.author &&
              response.data.filter.author.id) ||
            null

          const payload = {
            ...response.data,
            requested: request,
            filter: response.data.filter || {
              tags: [],
              author: {}
            }
          }

          if (
            isSubmissions(request.url) !==
            isSubmissions(listState.requested.url)
          ) {
            console.log("initListPage 2")
            dispatch(initListPage())
          }

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
            console.log("listAuthor dispatches fetchListAuthor")
            dispatch(fetchListAuthor(listAuthor, payload, appendItems))
            return
          }
          if (isSubmissions(request.url)) {
            //
            //
            //
            //
            //
            //
            console.log("request.url dispatches fetchListAuthor")
            dispatch(
              fetchListAuthor(getState().user.info.id, payload, appendItems)
            )
            return
          }

          dispatch(setListAuthor(undefined))
          console.log("dispatch setListPage 1")
          dispatch(setListPage(payload, appendItems))
        })
        .catch(() => {
          dispatch(
            initListPage({
              error: CARD_ERRORS.LIST
            })
          )
        })
    }, 20)
  }
}

export const fetchListAuthor = (authorId, payload, listAppendItems) => {
  const request = { url: `${ROUTE_API_AUTHORS}/${authorId}` }

  return dispatch => {
    axios(makeAPIRequest(request))
      .then(response => {
        dispatch(setListAuthor(response.data.info))
        console.log("dispatch setListPage 2")

        dispatch(setListPage(payload, listAppendItems))
      })
      .catch(() =>
        initListPage({
          error: CARD_ERRORS.LIST
        })
      )
  }
}
