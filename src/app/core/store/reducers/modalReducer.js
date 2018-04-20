const INITIAL_STATE = {
  hidden: true,
  status: "loading",
  info: {
    title: "Loading Card…",
    text: "",
    buttons: {}
  },
  requested: {
    method: "get",
    params: {},
    url: ""
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MODAL.SET_CARD":
      state = {
        ...state,
        ...action.payload
      }
      break
    case "MODAL.INIT_CARD":
      state = {
        ...INITIAL_STATE,
        ...action.payload
      }
      break
    case "MODAL.HIDE_CARD":
      state = {
        ...state,
        hidden: true,
        requested: state.requested
      }
      break
    default:
      return state
  }
  return state
}
