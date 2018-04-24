import axios from "axios"

import { CARD_ALERTS, CARD_ERRORS } from "../constants/messages-session"
import {
  ROUTE_API_LOGIN_EMAIL,
  ROUTE_API_USER
} from "../constants/routes-session"
import { ROUTE_API_USERS } from "../../admin/constants/routes-admin"
import { TEXT_ERRORS } from "../../core/constants/messages-"
import { anonymizeEmail } from "../utils/messages-session"
import { makeAPIRequest } from "../../utils"
import { setCard } from "../../core/store/actions-modal"

// manage connectivity
export const setConnectionStatus = connection => {
  return {
    type: "USER.SET_CONNECTION_STATUS",
    payload: connection
  }
}

// error message
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

// remember sesion user and method
// helpful when showing to user how they logged in last time
export const setSessionInfo = (method, id = "") => {
  return {
    type: "USER.SET_SESSION_INFO",
    payload: { method, id }
  }
}
export const refreshSessionInfo = () => {
  return { type: "USER.REFRESH_SESSION_INFO" }
}

// log in with email
export const loginWithEmail = validatedEmail => {
  return dispatch => {
    // 60 second timeout block for email logins
    dispatch({
      type: "USER.SET_EMAIL_LOGIN_TIMEOUT",
      payload: Date.now() + 61 * 1000
    })
    dispatch({
      type: "USER.SET_EMAIL_LOGIN_STATUS",
      payload: "pending"
    })
    // remember anonymized email
    dispatch(setSessionInfo("email", anonymizeEmail(validatedEmail)))

    // send request
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

// check if user is logged in
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

      // confirm that the session info saved in localStorage actually went through
      // after 1 second - to ensure this fires AFTER setting the session info
      const delaySessionInfoConfirmation = setTimeout(() => {
        dispatch({ type: "USER.CONFIRM_SESSION_INFO" })
        clearTimeout(delaySessionInfoConfirmation)
      }, 1000)
    }
  }
}

// remove token from local storage
export const forget = () => {
  return dispatch => {
    localStorage.removeItem("token")
    dispatch({
      type: "USER.RESET_STATE",
      payload: null
    })
  }
}

// get user data matched to login credentials
export const getInfo = () => {
  return dispatch => {
    // read token and kick if none
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

        // register in Redux store
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

// set user routes, notably redirect after login url
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

// set user intent (i.e. user is about to use this part of the app)
export const setIntent = intent => {
  return {
    type: "USER.SET_INTENT",
    payload: intent
  }
}

// admin functions

export const fetchUserList = (options = {}, page = 1, appendItems = false) => {
  const params = {
    "items-per-page": options.itemsPerPage || undefined,
    page
  }
  return dispatch => {
    const request = {
      url: ROUTE_API_USERS,
      params,
      headers: {
        Authorization: "JWT " + localStorage.getItem("token")
      }
    }

    axios(makeAPIRequest(request))
      .then(response => {
        dispatch({
          type: appendItems ? "ACCOUNTS.ADD_PAGE" : "ACCOUNTS.SET_PAGE",
          payload: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
