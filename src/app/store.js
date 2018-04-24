import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import composer from "./user/store/reducers-composer"
import nav from "./core/store/reducers-nav"
import modal from "./core/store/reducers-modal"
import list from "./core/store/reducers-list"
import article from "./core/store/reducers-article"
import pictures from "./core/store/reducers-picture"
import user from "./user/store/reducers-user"

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
