// tools
import React from "react"
import Loadable from "react-loadable"
import { Switch, Route } from "react-router-dom"

// components
import Submit from "./Submit"
import SubmitSoon from "./SubmitSoon"
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
export default props => {
  // Composer isn't ready for production yet.
  if (process.env.NODE_ENV === "development")
    return (
      <Switch>
        <Route exact path="/submit" component={Submit} />
        <Route exact path="/submit/compose" component={Composer} />

        {/* Signin & upload submission */}
        <Route exact path="/submit/confirm-full-consent" component={Upload} />
        <Route exact path="/submit/confirm-basic-consent" component={Upload} />

        {/* Not found routes */}
        <Route path="/submit/*" component={NotFound} />
        <Route path="/beta*" component={NotFound} />
      </Switch>
    )
  else
    return (
      <Switch>
        {/* For beta testers */}
        <Route exact path="/beta" component={Submit} />
        <Route exact path="/beta/compose" component={Composer} />

        {/* Signin & upload submission */}
        <Route exact path="/beta/confirm-full-consent" component={Upload} />
        <Route exact path="/beta/confirm-basic-consent" component={Upload} />
        <Route path="/beta/*" component={NotFound} />

        <Route exact path="/submit" component={SubmitSoon} />
        {/* Not found routes */}
        <Route path="/submit/*" component={NotFound} />
      </Switch>
    )
}
