// tools
import axios from "axios"
import { axiosRequest } from "../utils/axios-request"
import { setCard } from "./modalActions"
import errorMessages from "../constants/messages/errors"

import { ROUTE_IMAGE_API } from "../constants/picture"

// track submission id -> none if this is a new submission or
// an id of an edited submission
export const setSubmissionId = id => {
  return {
    type: "COMPOSER.SET_SUBMISSION_ID",
    payload: id
  }
}
export const resetSubmissionId = () => {
  return {
    type: "COMPOSER.RESET_SUBMISSION_ID"
  }
}

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
          uploadProgress: Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          )
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
              text:
                error.response && error.response.data
                  ? `${
                      errorMessages.VIEW_TEMPLATE.SUBMISSION.text
                    } Possible reason: “${error.response.data.message}.”`
                  : errorMessages.VIEW_TEMPLATE.SUBMISSION.text,
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
    const request = {
      url: ROUTE_IMAGE_API,
      params: {
        fullConsent: "true",
        featured: "true"
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
