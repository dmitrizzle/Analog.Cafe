import { ROUTE_AUTH_USER_LANDING } from "../constants/user"

const INITIAL_STATE = {
  status: "pending",
  info: {},
  routes: {
    success: ROUTE_AUTH_USER_LANDING
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER.GET_USER":
      state = {
        ...state,
        ...action.payload
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
    default:
      return state
  }
  return state
}
