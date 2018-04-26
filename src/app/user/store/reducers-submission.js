const getLocalstatus = () =>
  localStorage.getItem("composer-submission-status")
    ? JSON.parse(localStorage.getItem("composer-submission-status"))
    : {}

const INITIAL_STATE = {
  uploadProgress: 0,
  status: {
    id: getLocalstatus().id || "",
    type: getLocalstatus().type || "unpublished"
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

    // for editing submissions
    case "COMPOSER.SET_SUBMISSION_STATUS":
      state = {
        ...state,
        status: action.payload
      }
      localStorage.setItem(
        "composer-submission-status",
        JSON.stringify(state.status)
      )
      break
    case "COMPOSER.RESET_SUBMISSION_STATUS":
      localStorage.removeItem("composer-submission-status")
      state = {
        ...state,
        status: {
          id: "",
          type: "unpublished"
        }
      }
      break

    default:
      return state
  }
  return state
}
