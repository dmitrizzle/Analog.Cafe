const INITIAL_STATE = {
  uploadProgress: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SUBMISSION.SET_UPLOAD_PROGRESS":
      state = {
        ...state,
        uploadProgress: action.payload.uploadProgress
      }
      break
    case "SUBMISSION.RESET_UPLOAD_PROGRESS":
      state = {
        ...state,
        uploadProgress: INITIAL_STATE.uploadProgress
      }
      break
    default:
      return state
  }
  return state
}
