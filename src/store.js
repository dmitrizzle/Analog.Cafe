import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import composer from "./app/lib/store/reducers/composerReducer"
import nav from "./app/lib/store/reducers/navReducer"
import modal from "./app/lib/store/reducers/modalReducer"
import list from "./app/lib/store/reducers/listReducer"
import article from "./app/lib/store/reducers/articleReducer"
import pictures from "./app/lib/store/reducers/pictureReducer"
import user from "./app/lib/store/reducers/userReducer"

export default createStore(
  combineReducers({
    composer,
    nav,
    modal,
    list,
    article,
    pictures,
    user
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(/*logger(), promise(),*/ thunk)
)
