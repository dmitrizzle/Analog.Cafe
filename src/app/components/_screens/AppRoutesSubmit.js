// tools
import React from "react"
import Loadable from "react-loadable"
import { Switch, Route } from "react-router-dom"

// components
import SubmitSoon from "./SubmitSoon"
import NotFound from "../../containers/_screens-errors/NotFound"
import Upload from "../../containers/_screens-auth/Upload"
import AsyncArticleLoader from "./AsyncArticleLoader"

// async components
// `/components/_screens/AppRoutes.js`
// `/components/_screens/AppRoutesSubmit.js`
// `/containers/_screens-auth/Me/index.js`
const AsyncSubmit = Loadable({
  loader: () => import("./Submit"),
  loading: AsyncArticleLoader,
  delay: 100
})
const AsyncComposer = Loadable({
  loader: () => import("./Composer"),
  loading: AsyncArticleLoader,
  delay: 100
})

// render
export default props => {
  // Composer isn't ready for production yet.
  if (process.env.NODE_ENV === "development")
    return (
      <Switch>
        <Route exact path="/submit" component={AsyncSubmit} />
        <Route exact path="/submit/compose" component={AsyncComposer} />

        {/* Signin & upload submission */}
        <Route exact path="/submit/confirm-full-consent" component={Upload} />
        <Route exact path="/submit/confirm-basic-consent" component={Upload} />

        {/* Not found routes */}
        <Route path="/submit/*" component={NotFound} />
      </Switch>
    )
  else
    return (
      <Switch>
        <Route exact path="/submit" component={SubmitSoon} />
        <Route path="/submit/*" component={NotFound} />
      </Switch>
    )
}
