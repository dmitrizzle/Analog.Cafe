import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import composer from "./user/store/reducers/composerReducer"
import nav from "./core/store/reducers/navReducer"
import modal from "./core/store/reducers/modalReducer"
import list from "./core/store/reducers/listReducer"
import article from "./core/store/reducers/articleReducer"
import pictures from "./core/store/reducers/pictureReducer"
import user from "./user/store/reducers/userReducer"

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
