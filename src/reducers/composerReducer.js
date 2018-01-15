const INITIAL_STATE = {
  draftStatus: "Draft",
  editorFocusRequested: 0,
  uploadProgress: 0,
  instantCollaborations: {
    status: "loading",
    items: []
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPLOAD.SET_STATUS":
      state = {
        ...state,
        uploadProgress: action.payload.uploadProgress
      }
      break
    case "UPLOAD.INIT_STATUS":
      state = {
        ...state,
        uploadProgress: INITIAL_STATE.uploadProgress
      }
      break
    case "COMPOSER.SET_DRAFT_STATUS":
      state = {
        ...state,
        draftStatus: action.payload
      }
      break
    case "COMPOSER.REQUEST_FOCUS":
      state = {
        ...state,
        editorFocusRequested: state.editorFocusRequested + 1
      }
      break
    case "COMPOSER.SET_INSTANT_COLLABORATIONS":
      state = {
        ...state,
        instantCollaborations: action.payload
      }
      break
    default:
      return state
  }
  return state
}
