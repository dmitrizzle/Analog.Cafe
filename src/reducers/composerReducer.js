export default (
  state = {
    draftStatus: "Draft",
    editorFocusRequested: 0
  },
  action
) => {
  switch (action.type) {
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
    default:
      return state
  }
  return state
}
