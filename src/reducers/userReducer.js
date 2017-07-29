const INITIAL_STATE = {
  status: "forbidden",
  info: {},
}

export default (state = INITIAL_STATE, action) =>  {
	switch (action.type) {
    case "USER.GET_SESSION":
      state = {
        ...state,
        ...action.payload
      }
      break
		default:
      return state
	}
	return state
}