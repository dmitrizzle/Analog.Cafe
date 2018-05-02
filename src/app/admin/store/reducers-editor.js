const getLocalstatus = () =>
  localStorage.getItem("composer-submission-status")
    ? JSON.parse(localStorage.getItem("composer-submission-status"))
    : {}

const INITIAL_STATE = {
  status: {
    id: getLocalstatus().id || "",
    type: getLocalstatus().type || "unpublished"
  },
  reject: {
    id: "",
    status: ""
  },
  publish: {
    id: "",
    status: ""
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SUBMISSION.PUBLISH":
      state = {
        ...state,
        publish: action.payload
      }
      break
    case "SUBMISSION.REJECT":
      state = {
        ...state,
        reject: action.payload
      }
      break
    case "SUBMISSION.SET_STATUS":
      state = {
        ...state,
        status: action.payload
      }
      localStorage.setItem(
        "composer-submission-status",
        JSON.stringify(state.status)
      )
      break
    case "SUBMISSION.RESET_STATUS":
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
