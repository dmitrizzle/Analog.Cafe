let accountListDefaults = []
for (var o = 0; o < 8; o++) {
  accountListDefaults[o] = { id: o }
}

const INITIAL_STATE = {
  accountList: {
    status: "loading",
    items: accountListDefaults
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ACCOUNTS.SET_PAGE":
      state = {
        ...state,
        accountList: action.payload
      }
      break
    case "ACCOUNTS.ADD_PAGE":
      state = {
        ...state,
        accountList: {
          ...state.accountList,
          items: [...state.accountList.items, ...action.payload.items]
        }
      }
      break

    default:
      return state
  }
  return state
}
