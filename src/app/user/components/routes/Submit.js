import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"
import React from "react"

import ArticleLoader from "../../../core/components/vignettes/ArticleLoader"
import NotFound from "../../../core/components/pages/NotFound"
import Submit from "../pages/Submit"
import Upload from "../pages/Upload"

// async components
const Composer = Loadable({
  loader: () => import("../pages/Composer_a"),
  loading: ArticleLoader,
  delay: 100
})

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
