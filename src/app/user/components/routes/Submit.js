import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"
import React from "react"

import ArticleLoader from "../../../core/components/pages/Article/components/ArticleLoader"

const Composer = Loadable({
  loader: () => import("../pages/Composer"),
  loading: ArticleLoader,
  delay: 100
})
const RestoreComposerBackup = Loadable({
  loader: () => import("../pages/RestoreComposerBackup"),
  loading: ArticleLoader,
  delay: 100
})

const NotFound = Loadable({
  loader: () =>
    import("../../../core/components/pages/Error/components/NotFound"),
  loading: ArticleLoader,
  delay: 100
})
const Rules = Loadable({
  loader: () => import("../pages/Rules"),
  loading: ArticleLoader,
  delay: 100
})
const Submit = Loadable({
  loader: () => import("../pages/Submit"),
  loading: ArticleLoader,
  delay: 100
})
const Upload = Loadable({
  loader: () => import("../pages/Upload"),
  loading: ArticleLoader,
  delay: 100
})

export default () => {
  return (
    <Switch>
      <Route exact path="/submit" component={Submit} />
      <Route exact path="/submit/compose" component={Composer} />
      <Route exact path="/submit/rules" component={Rules} />

      <Route exact path="/submit/confirm-full-consent" component={Upload} />

      <Route exact path="/submit/restore" component={RestoreComposerBackup} />

      <Route path="/submit/*" component={NotFound} />
    </Switch>
  )
}
