// tools
import axios from "axios"
import { ROUTE_IMAGE_API } from "../constants/picture"
import errorMessages from "../constants/messages/errors"
import { getFroth } from "../utils/image-froth"
import { axiosRequest } from "../utils/axios-request"

// return
const unknownAuthor = (id, error) => {
  return {
    type: "PICTURE.GET_INFO",
    payload: {
      info: {
        author: {
          name: errorMessages.VIEW_TEMPLATE.PICTURE.name,
          id: "unknown",
          error:
            !error.response || !error.response.status
              ? errorMessages.DISAMBIGUATION.CODE_204.error
              : error
        }
      },
      status: "fail",
      id
    }
  }
}
export const getInfo = src => {
  let id = getFroth(src)
  let request
  request = {
    url: ROUTE_IMAGE_API + "/" + id
  }

  return (dispatch, getState) => {
    // run duplicate & validation checks
    let picturesState = getState().pictures
    if (picturesState[id]) return

    axios(axiosRequest(request))
      .then(response => {
        response.data.status === "ok"
          ? dispatch({
              type: "PICTURE.GET_INFO",
              payload: {
                info: response.data.info,
                status: response.data.status,
                id
              }
            })
          : dispatch(unknownAuthor(id))
      })
      .catch(error => dispatch(unknownAuthor(id, error)))
  }
}

// admin stuff
export const deleteRecord = id => {
  let request
  request = {
    url: `${ROUTE_IMAGE_API}/${id}/delete`,
    method: "PUT",
    headers: {
      Authorization: "JWT " + localStorage.getItem("token")
    }
  }
  return dispatch => {
    console.log(id)
    axios(axiosRequest(request))
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

export const feature = id => {
  let request
  request = {
    url: `${ROUTE_IMAGE_API}/${id}/feature`,
    method: "PUT",
    headers: {
      Authorization: "JWT " + localStorage.getItem("token")
    }
  }
  return dispatch => {
    console.log(id)
    axios(axiosRequest(request))
      .then(response => {
        response.data.status === "ok"
          ? alert(
              `Featured ${id}! The cache will take a couple of minutes to update.`
            )
          : alert(`Failed to feature image record.`)
      })
      .catch(error => alert(`Error: ${error}`))
  }
}

export const unfeature = id => {
  let request
  request = {
    url: `${ROUTE_IMAGE_API}/${id}/unfeature`,
    method: "PUT",
    headers: {
      Authorization: "JWT " + localStorage.getItem("token")
    }
  }
  return dispatch => {
    console.log(id)
    axios(axiosRequest(request))
      .then(response => {
        response.data.status === "ok"
          ? alert(
              `Removed ${id} from featured list. The cache will take a couple of minutes to update.`
            )
          : alert(`Failed to unfeature image record.`)
      })
      .catch(error => alert(`Error: ${error}`))
  }
}
