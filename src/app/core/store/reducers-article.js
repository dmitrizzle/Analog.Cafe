import { DOCUMENT_PLACEHOLDER } from "../constants/messages-article"
import { TEXT_EMOJIS } from "../../constants"

const INITIAL_STATE = {
  status: "loading",
  title: TEXT_EMOJIS.HUG_RIGHT,
  subtitle: "Loading…",
  content: DOCUMENT_PLACEHOLDER,
  requested: {
    method: "get",
    params: {},
    url: ""
  },
  selection: {
    leftOffset: 0,
    topOffset: 0
  }
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ARTICLE.SET_PAGE":
      state = {
        ...state,
        ...action.payload
      }
      break
    case "ARTICLE.INIT_PAGE":
      state = {
        ...INITIAL_STATE,
        ...action.payload
      }
      break
    case "ARTICLE.SET_STATUS":
      state = {
        ...state,
        status: action.payload
      }
      break
    case "ARTICLE.SET_SELECTION":
      state = {
        ...state,
        selection: action.payload
      }
    default:
      return state
  }
  return state
}
