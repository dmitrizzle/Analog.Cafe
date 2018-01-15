import { createStore, combineReducers, applyMiddleware } from "redux"
// import logger from "redux-logger"
import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"

import composer from "./reducers/composerReducer"
import nav from "./reducers/navReducer"
import modal from "./reducers/modalReducer"
import list from "./reducers/listReducer"
import article from "./reducers/articleReducer"
import pictures from "./reducers/pictureReducer"
import user from "./reducers/userReducer"

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
