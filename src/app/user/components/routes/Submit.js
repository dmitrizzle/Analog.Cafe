// tools
import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"
import React from "react"

import ArticleLoader from "../../../core/components/stateless/_async/ArticleLoader"
import NotFound from "../../../core/components/containers/_screens-errors/NotFound"
import Submit from "../pages/Submit"
import Upload from "../pages/Upload"

// async components
// `/components/_screens/AppRoutes.js`
// `/components/_screens/AppRoutesSubmit.js`
// `/containers/_screens-auth/Me/index.js`
const Composer = Loadable({
  loader: () => import("../pages/Composer_a"),
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
