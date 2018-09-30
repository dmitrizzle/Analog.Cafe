import axios from "axios"

import { CARD_ALERTS } from "../constants/messages-admin"
import { ROUTE_API_ARTICLES } from "../../core/constants/routes-article"
import { ROUTE_API_SUBMISSIONS } from "../constants/routes-admin"
import { ROUTE_URL_USER_LANDING } from "../../user/constants/routes-session"
import { makeAPIRequest } from "../../utils"
import { setModal } from "../../core/store/actions-modal"

export const setStatus = (id, type) => {
  return {
    type: "SUBMISSION.SET_STATUS",
    payload: { id, type }
  }
}
export const resetStatus = () => {
  return {
    type: "SUBMISSION.RESET_STATUS"
  }
}

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
        dispatch(setModal(CARD_ALERTS.REJECTED_SUCCESSFULLY))
        dispatch({
          type: "SUBMISSION.REJECT",
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
export const deleteSubmission = (submissionId, history) => {
  return dispatch => {
    const request = {
      url: `${ROUTE_API_SUBMISSIONS}/${submissionId}`,
      method: "delete",
      headers: {
        Authorization: "JWT " + localStorage.getItem("token")
      }
    }
    axios(makeAPIRequest(request))
      .then(response => {
        dispatch(setModal(CARD_ALERTS.DELETED_SUCCESSFULLY))
        dispatch(history.push(ROUTE_URL_USER_LANDING))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
export const unpublishArticle = (submissionId, history) => {
  return dispatch => {
    const request = {
      url: `${ROUTE_API_ARTICLES}/${submissionId}`,
      method: "delete",
      headers: {
        Authorization: "JWT " + localStorage.getItem("token")
      }
    }
    axios(makeAPIRequest(request))
      .then(response => {
        dispatch(setModal(CARD_ALERTS.UNPUBLISHED_SUCCESSFULLY))
        dispatch(history.push("/"))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

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
        dispatch(setModal(CARD_ALERTS.SCHEDULED))
        dispatch({
          type: "SUBMISSION.PUBLISH",
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
