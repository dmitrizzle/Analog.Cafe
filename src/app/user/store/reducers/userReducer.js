// constatns

// set placeholders for accountList grid:
import { ROUTE_URL_USER_LANDING } from "../../constants/routes-session"

let accountListDefaults = []
for (var o = 0; o < 8; o++) {
  accountListDefaults[o] = { id: o }
}

// retrieve previous session's stats
const getLocalSessionInfo = () =>
  localStorage.getItem("session-info")
    ? JSON.parse(localStorage.getItem("session-info"))
    : {}

// retrieve previous session's routes
// this is useful for redirecting users to correct page
// after they logged in via email
const getLocalRoutes = () =>
  localStorage.getItem("routes")
    ? JSON.parse(localStorage.getItem("routes"))
    : {
        success: ROUTE_URL_USER_LANDING
      }

const INITIAL_STATE = {
  status: "forbidden",
  connection: {
    status: ""
  },
  info: {},
  routes: getLocalRoutes(),
  intent: {},
  emailLogin: {
    timeout: 0,
    status: "ok"
  },
  sessionInfo: {
    method: getLocalSessionInfo().method || "",
    id: getLocalSessionInfo().id || "",
    login: getLocalSessionInfo().login || false
  },

  accountList: {
    status: "loading",
    items: accountListDefaults
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
      localStorage.setItem("routes", JSON.stringify(state.routes))
      break
    case "USER.RESET_ROUTES":
      localStorage.removeItem("routes")
      state = {
        ...state,
        routes: INITIAL_STATE.routes
      }
      break
    case "USER.RESET_STATE":
      state = INITIAL_STATE
      break

    // Admin
    case "ACCOUNTS.SET_PAGE":
      state = {
        ...state,
        accountList: action.payload
      }
      break
    case "ACCOUNTS.ADD_PAGE":
      state = {
        ...state,
        accountList: {
          ...state.accountList,
          items: [...state.accountList.items, ...action.payload.items]
        }
      }
      break

    default:
      return state
  }
  return state
}
