import axios from "axios"

import {
  ID_GOOGLE_SEARCH_API,
  KEY_GOOGLE_SEARCH_API,
  ROUTE_GOOGLE_SEARCH_API
} from "../constants/rotes-search"
import { makeAPIRequest } from "../../utils"

export const setSearchResults = (data, appendItems = false) => {
  if (appendItems === false)
    return {
      type: "SEARCH.SET_RESULTS",
      payload: data
    }
  else
    return {
      type: "SEARCH.ADD_RESULTS",
      payload: data
    }
}
export const setSearchStatus = isFetching => {
  return {
    type: "SERCH.SET_STATUS",
    payload: isFetching
  }
}

export const getSearchResults = q => {
  let request
  request = {
    url: ROUTE_GOOGLE_SEARCH_API,
    params: {
      key: KEY_GOOGLE_SEARCH_API,
      cx: ID_GOOGLE_SEARCH_API,
      q
    }
  }
  return dispatch => {
    dispatch(setSearchStatus(true))
    axios(makeAPIRequest(request))
      .then(response => {
        dispatch(setSearchStatus(false))
        if (response.status === 200) {
          dispatch(setSearchResults(response.data, false))
        }
      })
      .catch(() => {
        dispatch(setSearchStatus(false))
      })
  }
}
