const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FAVOURITES.ADD":
      if (!action.payload.id) return state
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          user: 1
        }
      }
    case "FAVOURITES.DELETE":
      if (!state[action.payload]) return state
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          user: 0
        }
      }
    case "FAVOURITES.UPDATE":
      if (!action.payload.id) return state
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    default:
      return state
  }
}
