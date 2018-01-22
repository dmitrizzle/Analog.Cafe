// set placeholders for collabFeatures grid:
let collabFeaturesDefaults = []
for (var o = 0; o < 8; o++) {
  collabFeaturesDefaults[o] = { id: o }
}

// storing submission status in localStorage along with all contnet
const getLocalSubmissionStatus = () =>
  localStorage.getItem("composer-submission-status")
    ? JSON.parse(localStorage.getItem("composer-submission-status"))
    : {}
const localSubmissionStatus = getLocalSubmissionStatus()

const INITIAL_STATE = {
  draftStatus: "Draft",
  editorFocusRequested: 0,
  uploadProgress: 0,
  collabFeatures: {
    status: "loading",
    items: collabFeaturesDefaults
  },
  submissionStatus: {
    id: localSubmissionStatus.id || "",
    type: localSubmissionStatus.type || "unpublished"
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
    case "COMPOSER.SET_SUBMISSION_STATUS":
      state = {
        ...state,
        submissionStatus: action.payload
      }
      localStorage.setItem(
        "composer-submission-status",
        JSON.stringify(state.submissionStatus)
      )
      break
    case "COMPOSER.RESET_SUBMISSION_STATUS":
      localStorage.removeItem("composer-submission-status")
      state = {
        ...state,
        submissionStatus: INITIAL_STATE.submissionStatus
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
