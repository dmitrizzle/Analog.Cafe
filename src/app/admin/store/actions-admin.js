import axios from "axios"

import { ROUTE_API_USERS } from "../constants/routes-admin"
import { makeAPIRequest } from "../../utils"

export const fetchUserList = (options = {}, page = 1, appendItems = false) => {
  const params = {
    "items-per-page": options.itemsPerPage || undefined,
    page
  }
  return dispatch => {
    const request = {
      url: ROUTE_API_USERS,
      params,
      headers: {
        Authorization: "JWT " + localStorage.getItem("token")
      }
    }

    axios(makeAPIRequest(request))
      .then(response => {
        dispatch({
          type: appendItems ? "ACCOUNTS.ADD_PAGE" : "ACCOUNTS.SET_PAGE",
          payload: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
