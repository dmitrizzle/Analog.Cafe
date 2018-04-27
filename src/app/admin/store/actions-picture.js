// admin stuff
import axios from "axios"

import { ROUTE_API_IMAGES } from "../../user/constants/routes-submission"
import { makeAPIRequest } from "../../utils"

export const deletePictureRecord = id => {
  let request
  request = {
    url: `${ROUTE_API_IMAGES}/${id}/delete`,
    method: "PUT",
    headers: {
      Authorization: "JWT " + localStorage.getItem("token")
    }
  }
  return dispatch => {
    axios(makeAPIRequest(request))
      .then(response => {
        response.data.status === "ok"
          ? alert(
              `Deleted ${id} from database. It will be gone from cache in couple of minutes.`
            )
          : alert(`Failed to delete image record.`)
      })
      .catch(error => alert(`Error: ${error}`))
  }
}

export const featurePicture = id => {
  let request
  request = {
    url: `${ROUTE_API_IMAGES}/${id}/feature`,
    method: "PUT",
    headers: {
      Authorization: "JWT " + localStorage.getItem("token")
    }
  }
  return dispatch => {
    console.log(id)
    axios(makeAPIRequest(request))
      .then(response => {
        response.data.status === "ok"
          ? alert(
              `Featured ${id}! The cache will take a couple of minutes to update.`
            )
          : alert(`Failed to feature picture record.`)
      })
      .catch(error => alert(`Error: ${error}`))
  }
}

export const unfeaturePicture = id => {
  let request
  request = {
    url: `${ROUTE_API_IMAGES}/${id}/unfeature`,
    method: "PUT",
    headers: {
      Authorization: "JWT " + localStorage.getItem("token")
    }
  }
  return dispatch => {
    console.log(id)
    axios(makeAPIRequest(request))
      .then(response => {
        response.data.status === "ok"
          ? alert(
              `Removed ${id} from featured list. The cache will take a couple of minutes to update.`
            )
          : alert(`Failed to unfeature picture record.`)
      })
      .catch(error => alert(`Error: ${error}`))
  }
}
