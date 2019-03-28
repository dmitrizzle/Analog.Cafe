import axios from "axios"

import { ROUTE_API_FAVOURITE } from "../constants/routes-favourites"
import { makeAPIRequest } from "../../utils"

const token = localStorage.getItem("token")

export const addFavourite = data => {
  return dispatch => {
    if (!token) return
    const request = {
      url: ROUTE_API_FAVOURITE,
      headers: {
        Authorization: "JWT " + token
      },
      method: "PUT",
      data
    }
    axios(makeAPIRequest(request)).then(response => {
      dispatch({
        type: "FAVOURITES.ADD",
        payload: data
      })
    })
  }
}

export const deleteFavourite = id => {
  return dispatch => {
    if (!token) return
    const request = {
      url: ROUTE_API_FAVOURITE + `/${id}`,
      headers: {
        Authorization: "JWT " + token
      },
      method: "DELETE"
    }
    axios(makeAPIRequest(request)).then(response => {
      dispatch({
        type: "FAVOURITES.DELETE",
        payload: id
      })
    })
  }
}
export const isFavourite = article => {
  return dispatch => {
    if (!token) return
    const request = {
      url: ROUTE_API_FAVOURITE,
      headers: {
        Authorization: "JWT " + token
      },
      method: "GET",
      params: {
        article
      }
    }
    axios(makeAPIRequest(request)).then(response => {
      dispatch({
        type: "FAVOURITES.UPDATE",
        payload: response.data
      })
    })
  }
}
