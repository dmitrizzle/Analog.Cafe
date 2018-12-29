import axios from "axios"

import { CARD_ALERTS, CARD_ERRORS } from "../constants/messages-session"
import {
  ROUTE_API_LOGIN_EMAIL,
  ROUTE_API_LOGIN_REFRESH,
  ROUTE_API_USER
} from "../constants/routes-session"
import { TEXT_ERRORS } from "../../constants"
import { anonymizeEmail } from "../utils/messages-session"
import { makeAPIRequest } from "../../utils"
import { setModal } from "../../core/store/actions-modal"

const LOGIN_ERROR = (type = "error") => {
  return {
    status: "ok",
    info: {
      title: CARD_ERRORS.AUTHENICATION.title,
      text: TEXT_ERRORS.CODE_401[type],
      buttons: [
        {
          to: "/sign-in",
          text: "Sign In",
          branded: true
        },
        {
          to: "/",
          text: "Go to Home Page"
        }
      ]
    }
  }
}

export const setConnectionStatus = connection => {
  return {
    type: "USER.SET_CONNECTION_STATUS",
    payload: connection
  }
}

export const addSessionInfo = sessionInfo => {
  return {
    type: "USER.ADD_SESSION_INFO",
    payload: sessionInfo
  }
}
export const getSessionInfo = () => {
  return { type: "USER.GET_SESSION_INFO" }
}

export const loginWithEmail = validatedEmail => {
  return dispatch => {
    dispatch({
      type: "USER.SET_EMAIL_LOGIN_TIMEOUT",
      payload: Date.now() + 61 * 1000
    })
    dispatch({
      type: "USER.SET_EMAIL_LOGIN_STATUS",
      payload: "pending"
    })
    dispatch(
      addSessionInfo({
        loginMethod: "email",
        loginEmail: anonymizeEmail(validatedEmail)
      })
    )
    axios(
      makeAPIRequest({
        url: ROUTE_API_LOGIN_EMAIL,
        data: { email: validatedEmail },
        method: "post"
      })
    )
      .then(() => {
        dispatch(setModal(CARD_ALERTS.LOGIN_EMAIL(validatedEmail)))
        dispatch({
          type: "USER.SET_EMAIL_LOGIN_STATUS",
          payload: "ok"
        })
      })
      .catch(() => {
        dispatch(
          setModal({
            status: "ok",
            info: CARD_ERRORS.LOGIN_EMAIL,
            requested: { url: "errors/email-login" }
          })
        )
        dispatch({
          type: "USER.SET_EMAIL_LOGIN_STATUS",
          payload: "ok"
        })
      })
  }
}
export const refreshUser = () => {
  return dispatch => {
    const token = localStorage.getItem("token")
    if (!token) return

    const request = {
      url: ROUTE_API_LOGIN_REFRESH,
      headers: {
        Authorization: "JWT " + token
      },
      method: "post"
    }
    axios(makeAPIRequest(request))
      .then(response => {
        localStorage.setItem("token", response.data.token)
      })
      .catch(() => {
        // fail silently
      })
  }
}
export const verifyUser = () => {
  return dispatch => {
    if (!localStorage.getItem("token"))
      dispatch({
        type: "USER.SET_STATUS",
        payload: "forbidden"
      })
    else {
      dispatch({
        type: "USER.SET_STATUS",
        payload: "ok"
      })
      const delaySessionInfoConfirmation = setTimeout(() => {
        dispatch(addSessionInfo({ hasLoggedIn: true }))
        clearTimeout(delaySessionInfoConfirmation)
      }, 1000)
    }
  }
}
export const forgetUser = () => {
  return dispatch => {
    localStorage.removeItem("token")
    dispatch({
      type: "USER.RESET_STATE",
      payload: null
    })
  }
}
export const getUserInfo = () => {
  return dispatch => {
    const token = localStorage.getItem("token")
    if (!token) return

    let request = {
      headers: {
        Authorization: "JWT " + token
      },
      url: ROUTE_API_USER
    }
    axios(makeAPIRequest(request))
      .then(response => {
        dispatch({
          type: "USER.SET_INFO",
          payload: response.data.info
        })
      })
      .catch(error => {
        localStorage.removeItem("token") // clean up broken/old token

        // register in Redux store
        dispatch({
          type: "USER.SET_STATUS",
          payload: "forbidden"
        })

        if (!error.response || !error.response.data) return
        dispatch(
          setModal(LOGIN_ERROR(error.response.data.message), {
            url: "errors/user"
          })
        )
      })
  }
}

export const setUserInfo = request => {
  return dispatch => {
    axios(makeAPIRequest(request))
      .then(response => {
        dispatch({
          type: "USER.SET_INFO",
          payload: response.data.info
        })
        dispatch({
          type: "USER.SET_STATUS",
          payload: "updated"
        })
      })
      .catch(error => {
        dispatch(
          setModal(LOGIN_ERROR(error.response.data.message), {
            url: "errors/user"
          })
        )
        dispatch({
          type: "USER.SET_STATUS",
          payload: "forbidden"
        })
      })
  }
}
export const acceptUserInfo = () => {
  return {
    type: "USER.SET_STATUS",
    payload: "ok"
  }
}
export const setUserRoutes = routes => {
  return {
    type: "USER.SET_ROUTES",
    payload: routes
  }
}
export const resetUserRoutes = () => {
  return {
    type: "USER.RESET_ROUTES"
  }
}
export const setUserIntent = intent => {
  return {
    type: "USER.SET_INTENT",
    payload: intent
  }
}
