import axios from "axios"

import { CARD_ALERTS, CARD_ERRORS } from "../constants/messages-session"
import {
  ROUTE_API_LOGIN_EMAIL,
  ROUTE_API_USER
} from "../constants/routes-session"
import { TEXT_ERRORS } from "../../constants"
import { anonymizeEmail } from "../utils/messages-session"
import { makeAPIRequest } from "../../utils"
import { setCard } from "../../core/store/actions-modal"

//

//

//

// NOTE: all functions in ALL actions should be reviewed and named for
// better clarity

//
//
///

// /
// /
//
// /
// /
// /

const loginError = (type = "error") => {
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
          text: "Nevermind"
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
export const setSessionInfo = (method, id = "") => {
  return {
    type: "USER.SET_SESSION_INFO",
    payload: { method, id }
  }
}
export const refreshSessionInfo = () => {
  return { type: "USER.REFRESH_SESSION_INFO" }
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
    dispatch(setSessionInfo("email", anonymizeEmail(validatedEmail)))
    axios(
      makeAPIRequest({
        url: ROUTE_API_LOGIN_EMAIL,
        data: { email: validatedEmail },
        method: "post"
      })
    )
      .then(() => {
        dispatch(setCard(CARD_ALERTS.LOGIN_EMAIL(validatedEmail)))
        dispatch({
          type: "USER.SET_EMAIL_LOGIN_STATUS",
          payload: "ok"
        })
      })
      .catch(() => {
        dispatch(
          setCard({
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
export const verify = () => {
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
        dispatch({ type: "USER.CONFIRM_SESSION_INFO" })
        clearTimeout(delaySessionInfoConfirmation)
      }, 1000)
    }
  }
}
export const forget = () => {
  return dispatch => {
    localStorage.removeItem("token")
    dispatch({
      type: "USER.RESET_STATE",
      payload: null
    })
  }
}
export const getInfo = () => {
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
          setCard(loginError(error.response.data.message), {
            url: "errors/user"
          })
        )
      })
  }
}

export const setInfo = request => {
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
          setCard(loginError(error.response.data.message), {
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
export const acceptInfo = () => {
  return {
    type: "USER.SET_STATUS",
    payload: "ok"
  }
}
export const setRoutes = routes => {
  return {
    type: "USER.SET_ROUTES",
    payload: routes
  }
}
export const resetRoutes = () => {
  return {
    type: "USER.RESET_ROUTES"
  }
}
export const setIntent = intent => {
  return {
    type: "USER.SET_INTENT",
    payload: intent
  }
}
