import { loadHeader } from "../../utils/browser-storage"
import { STATE_COMPOSER_HEADER_DEFAULT } from "../../constants/composer"

// set placeholders for imageList grid:
let imageListDefaults = []
for (var o = 0; o < 8; o++) {
  imageListDefaults[o] = { id: o }
}

// get submission status from localStorage
const getLocalSubmissionStatus = () =>
  localStorage.getItem("composer-submission-status")
    ? JSON.parse(localStorage.getItem("composer-submission-status"))
    : {}

const INITIAL_STATE = {
  draftStatus: "",
  editorFocusRequested: 0,
  headingValues: {
    title: loadHeader().title,
    subtitle: loadHeader().subtitle
  },
  uploadProgress: 0,
  imageList: {
    status: "loading",
    items: imageListDefaults
  },
  submissionStatus: {
    id: getLocalSubmissionStatus().id || "",
    type: getLocalSubmissionStatus().type || "unpublished"
  },
  submissionAdmin: {
    reject: {
      id: "",
      status: ""
    },
    publish: {
      id: "",
      status: ""
    }
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // upload reducers
    case "UPLOAD.SET_PROGRESS":
      state = {
        ...state,
        uploadProgress: action.payload.uploadProgress
      }
      break
    case "UPLOAD.INIT_PROGRESS":
      state = {
        ...state,
        uploadProgress: INITIAL_STATE.uploadProgress
      }
      break

    // submission reducers
    case "SUBMISSION.ADMIN_PUBLISH":
      state = {
        ...state,
        submissionAdmin: {
          ...state.submissionAdmin,
          publish: action.payload
        }
      }
      break
    case "SUBMISSION.ADMIN_REJECT":
      state = {
        ...state,
        submissionAdmin: {
          ...state.submissionAdmin,
          reject: action.payload
        }
      }
      break

    // track state for composer document
    case "COMPOSER.SET_HEADING_VALUES":
      state = {
        ...state,
        headingValues: action.payload
      }
      break
    case "COMPOSER.RESET_ALL_VALUES":
      const lsHeader = "composer-header-state"
      const lsContent = "composer-content-state"
      // store back-ups just in case
      localStorage.setItem(`backup-${lsHeader}`, localStorage.getItem(lsHeader))
      localStorage.setItem(
        `backup-${lsContent}`,
        localStorage.getItem(lsContent)
      )
      // remove active LS
      localStorage.removeItem(lsHeader)
      localStorage.removeItem(lsContent)

      state = {
        ...state,
        headingValues: STATE_COMPOSER_HEADER_DEFAULT
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
        submissionStatus: {
          id: "",
          type: "unpublished"
        }
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

    // image grid
    case "IMAGES.SET_PAGE":
      state = {
        ...state,
        imageList: action.payload
      }
      break
    case "IMAGES.ADD_PAGE":
      state = {
        ...state,
        imageList: {
          ...state.imageList,
          items: [...state.imageList.items, ...action.payload.items]
        }
      }
      break

    default:
      return state
  }
  return state
}
