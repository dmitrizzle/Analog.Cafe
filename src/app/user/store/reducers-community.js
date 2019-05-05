let authorsListDefaults = []
for (let o = 0; o < 10; o++) {
  authorsListDefaults[o] = { id: o }
}

const INITIAL_STATE = {
  authorsList: {
    status: "loading",
    items: authorsListDefaults
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTHORS.SET_PAGE":
      state = {
        ...state,
        authorsList: action.payload
      }
      break
    case "AUTHORS.ADD_PAGE":
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
