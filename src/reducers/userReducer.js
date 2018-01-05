import { ROUTE_AUTH_USER_LANDING } from "../constants/user"

const INITIAL_STATE = {
  status: "forbidden",
  info: {},
  routes: {
    success: ROUTE_AUTH_USER_LANDING
  },
  intent: {},
  emailLogin: {
    timeout: 0,
    status: "ok"
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER.SET_INFO":
      state = {
        ...state,
        info: action.payload
      }
      break
    case "USER.SET_STATUS":
      state = {
        ...state,
        status: action.payload
      }
      break

    case "USER.SET_EMAIL_LOGIN_TIMEOUT":
      state = {
        ...state,
        emailLogin: {
          ...state.emailLogin,
          timeout: action.payload
        }
      }
      break
    case "USER.SET_EMAIL_LOGIN_STATUS":
      state = {
        ...state,
        emailLogin: {
          ...state.emailLogin,
          status: action.payload
        }
      }
      break
    case "USER.SET_INTENT":
      state = {
        ...state,
        intent: action.payload
      }
      break
    case "USER.SET_ROUTES":
      state = {
        ...state,
        routes: action.payload
      }
      break
    case "USER.RESET_ROUTES":
      state = {
        ...state,
        routes: INITIAL_STATE.routes
      }
      break
    case "USER.RESET_STATE":
      state = INITIAL_STATE
      break
    default:
      return state
  }
  return state
}
