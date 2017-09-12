const INITIAL_STATE = {
  status: "pending",
  progress: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPLOAD.SET_STATUS":
      state = {
        ...state,
        ...action.payload
      }
      break
    case "UPLOAD.INIT_STATUS":
      state = INITIAL_STATE
      break
    default:
      return state
  }
  return state
}
