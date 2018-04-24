import axios from "axios"

import { ROUTE_API_IMAGES } from "../constants/routes-submission"
import { makeAPIRequest } from "../../utils"

export const fetchImageLib = (options = {}, page = 1, appendItems = false) => {
  const params = {
    featured: options.featured === false ? undefined : true,
    fullConsent: options.fullConsent === false ? undefined : true,
    "items-per-page": options.itemsPerPage || undefined,
    page
  }
  return dispatch => {
    const request = {
      url: ROUTE_API_IMAGES,
      params
    }
    axios(makeAPIRequest(request))
      .then(response => {
        dispatch({
          type: appendItems ? "IMAGELIB.ADD_PAGE" : "IMAGELIB.SET_PAGE",
          payload: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
