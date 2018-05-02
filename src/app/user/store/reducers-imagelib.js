let imageListDefaults = []
for (let o = 0; o < 8; o++) {
  imageListDefaults[o] = { id: o }
}

const INITIAL_STATE = {
  status: "loading",
  items: imageListDefaults
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "IMAGELIB.SET_PAGE":
      state = action.payload
      break
    case "IMAGELIB.ADD_PAGE":
      state = {
        ...state,
        ...action.payload,
        items: [...state.items, ...action.payload.items]
      }
      break
    default:
      return state
  }
  return state
}
