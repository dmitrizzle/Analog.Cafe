// tools
import axios from "axios"
import { ROUTE_IMAGE_API } from "../constants/picture"
import errorMessage from "../constants/error-messages"
import { imageSrcToPictureId } from "../app/containers/Picture/helpers"
// import { axiosRequest } from "./helpers"

// return
const unknownAuthor = (id, error) => {
  return {
    type: "PICTURE.GET_INFO",
    payload: {
      info: {
        author: {
          name: errorMessage.VIEW_TEMPLATE.PICTURE.name,
          id: "unknown",
          error:
            !error.response || !error.response.status
              ? errorMessage.DISAMBIGUATION.CODE_204.error
              : error
        }
      },
      status: "fail",
      id
    }
  }
}
export const getInfo = src => {
  let id = imageSrcToPictureId(src)
  let request
  request = {
    url: ROUTE_IMAGE_API + "/" + id
  }

  return (dispatch, getState) => {
    // run duplicate & validation checks
    let picturesState = getState().pictures
    if (picturesState[id]) return

    // axiosRequest(request)
    axios({
      method: request.method || "get",
      data: request.data || {},
      params: request.params || {},
      url: request.url + ".json"
    })
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
