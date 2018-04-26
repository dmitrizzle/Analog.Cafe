import { INPUT_HEADER_DEFAULTS } from "../constants/rules-submission"
import { loadHeader } from "../utils/actions-submission"

const INITIAL_STATE = {
  status: "",
  focusRequested: 0,
  header: {
    title: loadHeader().title,
    subtitle: loadHeader().subtitle
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "COMPOSER.SET_HEADER":
      state = {
        ...state,
        header: action.payload
      }
      break
    case "COMPOSER.RESET":
      const lsHeader = "composer-header-state"
      const lsContent = "composer-content-state"
      localStorage.setItem(`backup-${lsHeader}`, localStorage.getItem(lsHeader))
      localStorage.setItem(
        `backup-${lsContent}`,
        localStorage.getItem(lsContent)
      )
      localStorage.removeItem(lsHeader)
      localStorage.removeItem(lsContent)
      state = {
        ...state,
        header: INPUT_HEADER_DEFAULTS
      }
      break
    case "COMPOSER.SET_STATUS":
      state = {
        ...state,
        status: action.payload
      }
      break
    case "COMPOSER.REQUEST_FOCUS":
      state = {
        ...state,
        focusRequested: state.focusRequested + 1
      }
      break
    default:
      return state
  }
  return state
}
