import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import article from "./core/store/reducers-article"
import composer from "./user/store/reducers-composer"
import submission from "./user/store/reducers-submission"
import community from "./user/store/reducers-community"
import list from "./core/store/reducers-list"
import modal from "./core/store/reducers-modal"
import nav from "./core/store/reducers-nav"
import picture from "./core/store/reducers-picture"
import user from "./user/store/reducers-user"
import imagelib from "./user/store/reducers-imagelib"
import editor from "./admin/store/reducers-editor"
import admin from "./admin/store/reducers-admin"
import search from "./core/store/reducers-search"
import favourites from "./user/store/reducers-favourites"
export default createStore(
  combineReducers({
    composer,
    submission,
    nav,
    modal,
    community,
    list,
    article,
    picture,
    user,
    imagelib,
    editor,
    admin,
    search,
    favourites
  }),
  applyMiddleware(thunk)
)
