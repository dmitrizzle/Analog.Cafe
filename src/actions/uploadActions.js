// tools
import axios from "axios"
import { axiosRequest } from "../utils/axios-request"

import { ROUTE_SUBMISSION_PROGRESS_API } from "../constants/submission"

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

export const syncStatus = submissionId => {
  const request = {
    url: `${ROUTE_SUBMISSION_PROGRESS_API}/${submissionId}`
  }
  return dispatch => {
    dispatch(
      setStatus({
        status: "ok",
        progressQueue: "fetching"
      })
    )
    axios(axiosRequest(request)).then(response => {
      dispatch(
        setStatus({
          status: "ok",
          progressQueue: "available",
          progress: response.data.progress
        })
      )
    })
  }
}

export const uploadData = request => {
  return dispatch => {
    dispatch(initStatus())
    axios(axiosRequest(request))
      .then(response => {
        dispatch(
          setStatus({
            status: "ok",
            data: response.data
          })
        )
      })
      .catch(error => {
        error.response && error.response.status === 401
          ? dispatch(
              setStatus({
                status: "unauthorized"
              })
            )
          : dispatch(
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
