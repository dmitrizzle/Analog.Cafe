import { getFroth } from "@roast-cms/image-froth"
import axios from "axios"

import { CARD_ERRORS } from "../constants/messages-"
import { ROUTE_API_AUTHORS } from "../constants/routes-article"
import { ROUTE_API_IMAGES } from "../../user/constants/routes-submission"
import { TEXT_ERRORS } from "../../constants"
import { fetchModal, setModal } from "./actions-modal"
import { getFirstNameFromFull } from "../utils/messages-author"
import { makeAPIRequest } from "../../utils"

const UNKNOWN_AUTHOR = (id, error) => {
  return {
    type: "PICTURE.GET_INFO",
    payload: {
      info: {
        author: {
          name: CARD_ERRORS.PICTURE_AUTHOR.name,
          id: "unknown",
          error:
            !error.response || !error.response.status
              ? TEXT_ERRORS.CODE_204.error
              : error
        }
      },
      status: "fail",
      id
    }
  }
}
export const getPictureInfo = src => {
  let id = getFroth(src)
  let request
  request = {
    url: ROUTE_API_IMAGES + "/" + id
  }
  return (dispatch, getState) => {
    let picturesState = getState().picture
    if (picturesState[id]) return
    axios(makeAPIRequest(request))
      .then(response => {
        response.data.status === "ok"
          ? dispatch(
              setModal(
                {
                  info: {
                    image: src,
                    buttons: [
                      {
                        to: `/author/${response.data.info.author.id}`,
                        text: `Image by [${getFirstNameFromFull(
                          response.data.info.author.name
                        )}]`,
                        inverse: true
                      }
                    ],
                    headless: true
                  },
                  status: response.data.status,
                  id
                },
                {
                  url: "hints/image-author"
                }
              )
            )
          : dispatch(UNKNOWN_AUTHOR(id))
      })
      .catch(error => dispatch(UNKNOWN_AUTHOR(id, error)))
  }
}
