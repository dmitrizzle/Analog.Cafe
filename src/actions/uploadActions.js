// tools
import axios from "axios"
import { axiosRequest } from "../utils/axios-request"

// this is where the server status displayed for uploading images to
// Cloudinary - leaving here for futher reference
// import { ROUTE_SUBMISSION_PROGRESS_API } from "../constants/submission"

import { setCard } from "./modalActions"
import errorMessages from "../constants/messages/errors"

export const setStatus = state => {
  return {
    type: "UPLOAD.SET_STATUS",
    payload: state
  }
}
export const initStatus = () => {
  return {
    type: "UPLOAD.INIT_STATUS"
  }
}

export const uploadData = request => {
  let axiosRequestWithProgress = axiosRequest(request)
  return dispatch => {
    // register upload progress
    axiosRequestWithProgress.onUploadProgress = progressEvent =>
      dispatch(
        setStatus({
          progress: Math.round(progressEvent.loaded * 100 / progressEvent.total)
        })
      )

    // dispatch data upload
    axios(axiosRequestWithProgress).catch(error => {
      dispatch(
        setCard(
          {
            status: "ok",
            info: {
              title: errorMessages.VIEW_TEMPLATE.SUBMISSION.title,
              text: errorMessages.VIEW_TEMPLATE.SUBMISSION.text,
              error,
              stubborn: true,
              buttons: [
                {
                  to: "#try-again",
                  onClick: () => {
                    window.location.reload()
                  },
                  text: "Try Again",
                  red: true
                },
                {
                  to:
                    process.env.NODE_ENV === "development"
                      ? "/submit/compose"
                      : "/beta/compose",
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
