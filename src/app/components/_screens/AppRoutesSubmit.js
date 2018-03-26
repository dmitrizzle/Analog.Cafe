// tools
import React from "react"
import Loadable from "react-loadable"
import { Switch, Route } from "react-router-dom"

// components
import Submit from "./Submit"
import NotFound from "../../containers/_screens-errors/NotFound"
import Upload from "../../containers/_screens-auth/Upload"
import ArticleLoader from "../_async/ArticleLoader"

// async components
// `/components/_screens/AppRoutes.js`
// `/components/_screens/AppRoutesSubmit.js`
// `/containers/_screens-auth/Me/index.js`
const Composer = Loadable({
  loader: () => import("./Composer"),
  loading: ArticleLoader,
  delay: 100
})

// render
export default () => {
  return (
    <Switch>
      <Route exact path="/submit" component={Submit} />
      <Route exact path="/submit/compose" component={Composer} />

      {/* Signin & upload submission */}
      <Route exact path="/submit/confirm-full-consent" component={Upload} />
      <Route exact path="/submit/confirm-basic-consent" component={Upload} />

      {/* Not found routes */}
      <Route path="/submit/*" component={NotFound} />
    </Switch>
  )
}
