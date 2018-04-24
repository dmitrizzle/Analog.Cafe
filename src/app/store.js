import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import article from "./core/store/reducers-article"
import composer from "./user/store/reducers-submission"
import list from "./core/store/reducers-list"
import modal from "./core/store/reducers-modal"
import nav from "./core/store/reducers-nav"
import pictures from "./core/store/reducers-picture"
import user from "./user/store/reducers-user"
import imagelib from "./user/store/reducers-imagelib"

export default createStore(
  combineReducers({
    composer,
    nav,
    modal,
    list,
    article,
    pictures,
    user,
    imagelib
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)
