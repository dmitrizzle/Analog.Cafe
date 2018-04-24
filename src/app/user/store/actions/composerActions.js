import axios from "axios"

import { CARD_ALERTS } from "../../../admin/constants/messages-admin"
import { CARD_ERRORS } from "../../constants/messages-submission"
import {
  ROUTE_API_IMAGES,
  ROUTE_API_SUBMISSIONS
} from "../../constants/routes-submission"
import { makeAPIRequest } from "../../../utils"
import { setCard } from "../../../core/store/actions/modalActions"

// manage Composer state
// note that Slate Editor state must be manage separately from within
// Editor component and React's {state}
export const setHeadingValues = value => {
  return {
    type: "COMPOSER.SET_HEADING_VALUES",
    payload: value
  }
}
export const resetAllValues = () => {
  return {
    type: "COMPOSER.RESET_ALL_VALUES",
    payload: null
  }
}

// track submission id -> none if this is a new submission or
// an id of an edited submission
export const setSubmissionStatus = (id, type) => {
  return {
    type: "COMPOSER.SET_SUBMISSION_STATUS",
    payload: { id, type }
  }
}
export const resetSubmissionStatus = () => {
  return {
    type: "COMPOSER.RESET_SUBMISSION_STATUS"
  }
}

// monitor upload status and percentage
export const setUploadProgress = state => {
  return {
    type: "UPLOAD.SET_PROGRESS",
    payload: state
  }
}
export const initUploadProgress = () => {
  return {
    type: "UPLOAD.INIT_PROGRESS"
  }
}

// this is where the server status displayed for uploading images to
// Cloudinary - leaving here for futher reference
// import { ROUTE_SUBMISSION_PROGRESS_API } from "../constants/submission"

export const uploadData = request => {
  let makeAPIRequestWithProgress = makeAPIRequest(request)
  return dispatch => {
    // register upload progress
    makeAPIRequestWithProgress.onUploadProgress = progressEvent =>
      dispatch(
        setUploadProgress({
          uploadProgress: Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          )
        })
      )

    // dispatch data upload
    axios(makeAPIRequestWithProgress).catch(error => {
      dispatch(
        setUploadProgress({
          uploadProgress: -1
        })
      )
      dispatch(
        setCard(
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

// monitor draft (save) status and show in header nav
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
export const fetchImageList = (options = {}, page = 1, appendItems = false) => {
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
          type: appendItems ? "IMAGES.ADD_PAGE" : "IMAGES.SET_PAGE",
          payload: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

// reject submission
export const rejectSubmission = submissionId => {
  return dispatch => {
    const request = {
      url: `${ROUTE_API_SUBMISSIONS}/${submissionId}/reject`,
      method: "post",
      headers: {
        Authorization: "JWT " + localStorage.getItem("token")
      }
    }
    axios(makeAPIRequest(request))
      .then(response => {
        dispatch(setCard(CARD_ALERTS.REJECTED_SUCCESSFULLY))
        dispatch({
          type: "SUBMISSION.ADMIN_REJECT",
          payload: {
            id: submissionId,
            status: response.status
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

// publish submission
export const publishSubmission = (submissionId, scheduledOrder, tag) => {
  return dispatch => {
    const request = {
      url: `${ROUTE_API_SUBMISSIONS}/${submissionId}/approve`,
      method: "post",
      data: {
        scheduledOrder,
        tag
      },
      headers: {
        Authorization: "JWT " + localStorage.getItem("token")
      }
    }

    axios(makeAPIRequest(request))
      .then(response => {
        dispatch(setCard(CARD_ALERTS.SCHEDULED))
        dispatch({
          type: "SUBMISSION.ADMIN_PUBLISH",
          payload: {
            id: submissionId,
            status: response.data.status
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
