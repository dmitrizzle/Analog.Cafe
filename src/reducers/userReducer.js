// constatns
import { ROUTE_AUTH_USER_LANDING } from "../constants/user"

// retrieve previous session's stats
const getLocalSessionInfo = () =>
  localStorage.getItem("session-info")
    ? JSON.parse(localStorage.getItem("session-info"))
    : {}

const INITIAL_STATE = {
  status: "forbidden",
  connection: {
    status: ""
  },
  info: {},
  routes: {
    success: ROUTE_AUTH_USER_LANDING
  },
  intent: {},
  emailLogin: {
    timeout: 0,
    status: "ok"
  },
  sessionInfo: {
    method: getLocalSessionInfo().method || "",
    id: getLocalSessionInfo().id || "",
    login: getLocalSessionInfo().login || false
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER.SET_CONNECTION_STATUS":
      state = {
        ...state,
        connection: {
          ...state.connection,
          status: action.payload
        }
      }
      break
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

    case "USER.SET_SESSION_INFO":
      state = {
        ...state,
        sessionInfo: action.payload
      }
      localStorage.setItem("session-info", JSON.stringify(state.sessionInfo))
      break
    case "USER.CONFIRM_SESSION_INFO":
      state = {
        ...state,
        sessionInfo: {
          ...state.sessionInfo,
          login: true
        }
      }
      localStorage.setItem("session-info", JSON.stringify(state.sessionInfo))
      break
    case "USER.RESET_SESSION_INFO":
      localStorage.removeItem("session-info")
      state = {
        ...state,
        sessionInfo: INITIAL_STATE.sessionInfo
      }
      break
    case "USER.REFRESH_SESSION_INFO":
      state = {
        ...state,
        sessionInfo: {
          method: getLocalSessionInfo().method || "",
          id: getLocalSessionInfo().id || "",
          login: getLocalSessionInfo().login || false
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
