import { TEXT_EMOJIS } from "../../constants"

const INITIAL_STATE = {
  status: "loading",
  title: TEXT_EMOJIS.HUG_RIGHT,
  subtitle: "Loading…",
  content: {
    raw: {
      document: {
        nodes: [
          {
            object: "block",
            type: "paragraph",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text:
                      "█████████ █████ █████████ ██████████████ ███████████ ████████ █████ ██ █████████ █████ █████████ ██████████████ █████████████ ██████ ███ ██ ██████ █████ █████ █████████ ██████████████ ███████████ ████████ █████ ███████████ █████ █████████ █████████ █████ ███████████ ████████ █████ ███████████ █████ █████████ ██████████████ ███████████ ████████ █████ ███████████ █████ █████████ ██████████ █████████ █████ █████████ █ ████████ ████████████ █████████ ███████████ █████████████ █ ████████ █████ ██"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  requested: {
    method: "get",
    params: {},
    url: ""
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
    default:
      return state
  }
  return state
}