import axios from "axios"

import { HOST_API } from "../../constants"
import { makeAPIRequest } from "../../utils"

export const fetchAuthorsList = (options = {}, page = 1) => {
  const params = {
    "items-per-page": options.itemsPerPage || undefined,
    page
  }
  return dispatch => {
    const request = {
      url: HOST_API + "/authors",
      params
    }
    axios(makeAPIRequest(request)).then(response => {
      dispatch({
        type: "AUTHORS.SET_PAGE",
        payload: response.data
      })
    })
  }
}
