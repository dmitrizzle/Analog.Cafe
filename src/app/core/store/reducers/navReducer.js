export default (
  state = {
    view: "VISITOR",
    location: { top: true, bottom: true }
  },
  action
) => {
  switch (action.type) {
    case "NAV.SET_VIEW":
      state = {
        ...state,
        view: action.payload
      }
      break
    case "NAV.SET_LOCATION":
      const top = action.payload.top
      const bottom = action.payload.bottom
      state = {
        ...state,
        location: {
          top: typeof top === "undefined" ? true : top,
          bottom: typeof bottom === "undefined" ? true : bottom
        }
      }
      break
    default:
      return state
  }
  return state
}
