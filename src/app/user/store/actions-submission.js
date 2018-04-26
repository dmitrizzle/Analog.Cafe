import axios from "axios"

import { CARD_ALERTS } from "../../admin/constants/messages-admin"
import { CARD_ERRORS } from "../constants/messages-submission"
import { ROUTE_API_SUBMISSIONS } from "../constants/routes-submission"
import { makeAPIRequest } from "../../utils"
import { setCard } from "../../core/store/actions-modal"

// Slate Editor state can not be managed via Redux

export const setstatus = (id, type) => {
  return {
    type: "COMPOSER.SET_SUBMISSION_STATUS",
    payload: { id, type }
  }
}
export const resetstatus = () => {
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
