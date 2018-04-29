import axios from "axios"

import { CARD_ERRORS } from "../constants/messages-submission"
import { makeAPIRequest } from "../../utils"
import { setModal } from "../../core/store/actions-modal"

export const setUploadProgress = state => {
  return {
    type: "SUBMISSION.SET_UPLOAD_PROGRESS",
    payload: state
  }
}
export const resetUploadProgress = () => {
  return {
    type: "SUBMISSION.RESET_UPLOAD_PROGRESS"
  }
}

export const uploadSubmission = request => {
  let makeAPIRequestWithProgress = makeAPIRequest(request)
  return dispatch => {
    makeAPIRequestWithProgress.onUploadProgress = progressEvent =>
      dispatch(
        setUploadProgress({
          uploadProgress: Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          )
        })
      )
    axios(makeAPIRequestWithProgress).catch(error => {
      dispatch(
        setUploadProgress({
          uploadProgress: -1
        })
      )
      dispatch(
        setModal(
          {
            status: "ok",
            info: {
              title: CARD_ERRORS.SEND.title,
              text:
                error.response && error.response.data
                  ? `${CARD_ERRORS.SEND.text} Possible reason: “${
                      error.response.data.message
                    }.”`
                  : CARD_ERRORS.SEND.text,
              error,
              stubborn: true,
              buttons: [
                {
                  to: "#try-again",
                  onClick: () => {
                    window.location.reload()
                  },
                  text: "Try Again",
                  branded: true
                },
                {
                  to: "/submit/compose",
                  text: "Cancel"
                }
              ]
            }
          },
          {
            url: "errors/upload"
          }
        )
      )
    })
  }
}
