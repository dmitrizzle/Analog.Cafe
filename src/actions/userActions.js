// tools
import axios from "axios"
import { setCard } from "./modalActions"
import errorMessages from "../constants/messages/errors"
import { ROUTE_LOGIN_WITH_EMAIL } from "../constants/login"
import { axiosRequest } from "../utils/axios-request"

import { ROUTE_USER_API } from "../constants/user"

// error message
const loginError = (type = "error") => {
  return {
    status: "ok",
    info: {
      title: errorMessages.VIEW_TEMPLATE.CARD.title,
      text: errorMessages.DISAMBIGUATION.CODE_401[type]
    }
  }
}

// log in with email
export const loginWithEmail = validatedEmail => {
  return dispatch => {
    axios(
      axiosRequest({
        url: ROUTE_LOGIN_WITH_EMAIL,
        data: { email: validatedEmail }
      })
    )
      .then(response => {
        alert(response.status)
        dispatch({
          type: "USER.SET_EMAIL_LOGIN_TIMEOUT",
          payload: new Date().getTime()
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
    else
      dispatch({
        type: "USER.SET_STATUS",
        payload: "ok"
      })
  }
}

// remove token from local storage
export const forget = () => {
  console.log("forgot")
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
        if (!error.response.data) return
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
      .catch(error => dispatch(setCard(loginError, { url: "errors/user" })))
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
