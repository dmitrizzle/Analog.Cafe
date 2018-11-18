import { LIST_PLACEHOLDER } from "../constants/messages-list"

const INITIAL_STATE = {
  isFetching: false,
  data: {
    items: [],
    queries: {},
    searchInformation: {}
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SERCH.SET_STATUS":
      state = {
        ...state,
        isFetching: action.payload
      }
      break
    case "SEARCH.SET_RESULTS":
      state = {
        ...state,
        data: action.payload
      }
      break
    case "SEARCH.ADD_RESULTS":
      state = {
        ...state,
        data: {
          ...state.data,
          items: [...state.data.items, action.payload.items],
          searchInformation: action.payload.searchInformation
        }
      }
      break
    case "SEARCH.INIT_RESULTS":
      state = {
        ...INITIAL_STATE,
        ...action.payload
      }
      break
    default:
      return state
  }
  return state
}
