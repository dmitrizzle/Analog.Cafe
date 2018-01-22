// tools
import { loadHeader, loadContent } from "../utils/composer-loader"

// set placeholders for collabFeatures grid:
let collabFeaturesDefaults = []
for (var o = 0; o < 8; o++) {
  collabFeaturesDefaults[o] = { id: o }
}

// get submission status from localStorage
const getLocalSubmissionStatus = () =>
  localStorage.getItem("composer-submission-status")
    ? JSON.parse(localStorage.getItem("composer-submission-status"))
    : {}

const INITIAL_STATE = {
  draftStatus: "Draft",
  editorFocusRequested: 0,
  editorValues: {
    document: loadContent(),
    title: loadHeader().title,
    subtitle: loadHeader().subtitle
  },
  uploadProgress: 0,
  collabFeatures: {
    status: "loading",
    items: collabFeaturesDefaults
  },
  submissionStatus: {
    id: getLocalSubmissionStatus().id || "",
    type: getLocalSubmissionStatus().type || "unpublished"
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // track state for composer document
    case "COMPOSER.SET_VALUE_DOCUMENT":
      state = {
        ...state,
        editorValues: {
          ...state.editorValues,
          document: action.payload
        }
      }
      break
    case "COMPOSER.SET_VALUE_TITLE":
      state = {
        ...state,
        editorValues: {
          ...state.editorValues,
          title: action.payload
        }
      }
      break
    case "COMPOSER.SET_VALUE_SUBTITLE":
      state = {
        ...state,
        editorValues: {
          ...state.editorValues,
          subtitle: action.payload
        }
      }
      break
    case "COMPOSER.RESET_VALUES":
      localStorage.removeItem("composer-header-state")
      localStorage.removeItem("composer-content-state")

      state = {
        ...state,
        editorValues: INITIAL_STATE.editorValues
      }
      break

    // upload reducers
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

    // for editing submissions
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

    // notification for saving everything locally
    case "COMPOSER.SET_DRAFT_STATUS":
      state = {
        ...state,
        draftStatus: action.payload
      }
      break

    // additional reducers for Composer internals
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
