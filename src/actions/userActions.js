// tools
import axios from "axios"
import { setCard } from "./modalActions"
import errorMessages from "../constants/messages/errors"
import { ROUTE_LOGIN_WITH_EMAIL } from "../constants/login"
import { MESSAGE_HINT_CHECK_EMAIL } from "../constants/messages/hints"
import { axiosRequest } from "../utils/axios-request"
import { anonymizeEmail } from "../utils/email-utils"

import { ROUTE_USER_API } from "../constants/user"

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
      title: errorMessages.VIEW_TEMPLATE.AUTHENICATION.title,
      text: errorMessages.DISAMBIGUATION.CODE_401[type],
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
      axiosRequest({
        url: ROUTE_LOGIN_WITH_EMAIL,
        data: { email: validatedEmail },
        method: "post"
      })
    )
      .then(response => {
        dispatch(setCard(MESSAGE_HINT_CHECK_EMAIL(validatedEmail)))
        dispatch({
          type: "USER.SET_EMAIL_LOGIN_STATUS",
          payload: "ok"
        })
      })
      .catch(error => {
        dispatch(
          setCard({
            status: "ok",
            info: errorMessages.VIEW_TEMPLATE.EMAIL_LOGIN,
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
      url: ROUTE_USER_API
    }
    axios(axiosRequest(request))
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
    axios(axiosRequest(request))
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
