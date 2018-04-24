const INITIAL_STATE = {
  status: "loading",
  filter: {
    tags: [],
    author: {}
  },
  page: {
    current: "1",
    total: "1"
  },
  items: [
    {
      type: "placeholder",
      tag: "████████",
      title: "███",
      id: "0000000",
      author: {
        name: "██████"
      },
      summary: "█ ████████ ██████ ████ ████ ██████████ ████ ████████████████ ██"
    },
    {
      type: "placeholder",
      tag: "████",
      title: "████",
      id: "0000001",
      author: {
        name: "█████"
      },
      summary: "█████ ████████████ ████████ ███ ███████████ ██████████████████"
    },
    {
      type: "placeholder",
      tag: "█████████",
      title: "██",
      id: "0000002",
      author: {
        name: "██"
      },
      summary:
        "█ ██████████ ██████ ██████ ███████████ ███ ███████████ █████████"
    }
  ],
  requested: {
    method: "get",
    params: {},
    url: ""
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LIST.SET_PAGE":
      state = {
        ...state,
        ...action.payload
      }
      break
    case "LIST.ADD_PAGE":
      state = {
        ...state,
        ...action.payload,
        items: [...state.items, ...action.payload.items]
      }
      break
    case "LIST.INIT_PAGE":
      state = {
        ...INITIAL_STATE,
        ...action.payload
      }
      break
    default:
      return state
  }
  return state
}
