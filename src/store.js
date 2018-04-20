import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import composer from "./app/core/store/reducers/composerReducer"
import nav from "./app/core/store/reducers/navReducer"
import modal from "./app/core/store/reducers/modalReducer"
import list from "./app/core/store/reducers/listReducer"
import article from "./app/core/store/reducers/articleReducer"
import pictures from "./app/core/store/reducers/pictureReducer"
import user from "./app/core/store/reducers/userReducer"

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
