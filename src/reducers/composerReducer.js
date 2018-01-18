// set placeholders for collabFeatures grid:
let collabFeaturesDefaults = []
for (var o = 0; o < 8; o++) {
  collabFeaturesDefaults[o] = { id: o }
}

// storing submissionId in localStorage along with all contnet
const getLocalSubmissionId = () =>
  localStorage.getItem("composer-submission-id")
    ? localStorage.getItem("composer-submission-id")
    : ""
const localSubmissionId = getLocalSubmissionId()

const INITIAL_STATE = {
  draftStatus: "Draft",
  editorFocusRequested: 0,
  uploadProgress: 0,
  collabFeatures: {
    status: "loading",
    items: collabFeaturesDefaults
  },
  submissionId: localSubmissionId ? localSubmissionId : ""
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
    case "COMPOSER.SET_SUBMISSION_ID":
      state = {
        ...state,
        submissionId: action.payload
      }
      localStorage.setItem("composer-submission-id", state.submissionId)
      break
    case "COMPOSER.RESET_SUBMISSION_ID":
      state = {
        ...state,
        submissionId: INITIAL_STATE.submissionId
      }
      localStorage.removeItem("composer-submission-id")
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
    case "COMPOSER.SET_COLLAB_FEATURES":
      state = {
        ...state,
        collabFeatures: {
          status: "ok",
          items: action.payload
        }
      }
      break
    default:
      return state
  }
  return state
}
