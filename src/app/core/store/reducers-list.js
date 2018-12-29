import { LIST_PLACEHOLDER } from "../constants/messages-list"

const INITIAL_STATE = {
  status: "loading",
  filter: {
    tags: [],
    author: {}
  },
  page: {
    current: "1",
    total: "1"
  },
  items: LIST_PLACEHOLDER,
  requested: {
    method: "get",
    params: {},
    url: ""
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LIST.SET_PAGE":
      state = {
        ...state,
        ...action.payload
      }
      break
    case "LIST.ADD_PAGE":
      state = {
        ...state,
        ...action.payload,
        items: [...state.items, ...action.payload.items]
      }
      break
    case "LIST.INIT_PAGE":
      state = {
        ...INITIAL_STATE,
        ...action.payload
      }
      break
    case "LIST.SET_AUTHOR":
      state = {
        ...state,
        author: action.payload
      }
      break
    default:
      return state
  }
  return state
}
