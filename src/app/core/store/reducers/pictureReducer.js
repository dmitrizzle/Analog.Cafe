export default (
  state = {
    default: {
      status: "loading",
      info: {
        author: {
          name: "Finding image author…",
          id: ""
        }
      }
    }
  },
  action
) => {
  switch (action.type) {
    case "PICTURE.GET_INFO":
      state = {
        ...state,
        [action.payload.id]: {
          status: action.payload.status,
          info: action.payload.info
        }
      }
      break
    default:
      return state
  }
  return state
}
