// tools
import axios from "axios"
import { axiosRequest } from "../utils/axios-request"
import { setCard } from "./modalActions"
import errorMessages from "../constants/messages/errors"

import { ROUTE_IMAGE_API } from "../constants/picture"

// monitor upload status and percentage
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

// this is where the server status displayed for uploading images to
// Cloudinary - leaving here for futher reference
// import { ROUTE_SUBMISSION_PROGRESS_API } from "../constants/submission"

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
        setStatus({
          uploadProgress: -1
        })
      )
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

// monitor draft status and show in header nav
export const setDraftStatus = status => {
  return {
    type: "COMPOSER.SET_DRAFT_STATUS",
    payload: status
  }
}
export const requestFocus = () => {
  return {
    type: "COMPOSER.REQUEST_FOCUS"
  }
}

// query instant collaboration items
export const fetchCollabFeatures = () => {
  return dispatch => {
    const token = localStorage.getItem("token")
    if (!token) return // show "need to login message"
    const request = {
      url: ROUTE_IMAGE_API,
      params: {
        fullConsent: "true",
        featured: "true"
      },
      headers: {
        Authorization: "JWT " + token
      }
    }

    axios(axiosRequest(request))
      .then(response => {
        dispatch({
          type: "COMPOSER.SET_COLLAB_FEATURES",
          payload: response.data.items
        })
      })
      .catch(error => {
        // error
      })
  }
}
