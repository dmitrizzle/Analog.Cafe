import axios from "axios"

import { CARD_ALERTS } from "../constants/messages-admin"
import { ROUTE_API_SUBMISSIONS } from "../constants/routes-admin"
import { makeAPIRequest } from "../../utils"
import { setCard } from "../../core/store/actions-modal"

export const setstatus = (id, type) => {
  return {
    type: "SUBMISSION.SET_STATUS",
    payload: { id, type }
  }
}
export const resetstatus = () => {
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
        dispatch(setCard(CARD_ALERTS.REJECTED_SUCCESSFULLY))
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
