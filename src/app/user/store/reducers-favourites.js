const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  // console.log("action", action);
  if (!action) return state
  switch (action.type) {
    case "FAVOURITES.ADD":
      if (!action.payload.id) return state
      state[action.payload.id] = {
        ...action.payload,
        user: 1
      }
      // console.log("state", state);
      return state
    case "FAVOURITES.DELETE":
      state[action.payload].user = 0
      return state
    case "FAVOURITES.UPDATE":
      if (!action.payload.id) return state
      state[action.payload.id] = action.payload
      return state
    default:
      return state
  }
}
