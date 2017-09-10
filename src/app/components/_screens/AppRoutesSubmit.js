// tools
import React from "react"
import Loadable from "react-loadable"
import { Switch, Route } from "react-router-dom"

// components
import SubmitSoon from "./SubmitSoon"
import NotFound from "../../containers/_screens-errors/NotFound"
import SubmitConfirm from "../../containers/_screens-auth/SubmitConfirm"

// async components
const AsyncSubmit = Loadable({
  loader: () => import("./Submit"),
  loading: () => <div>Loading...</div>
})
const AsyncComposer = Loadable({
  loader: () => import("./Composer"),
  loading: () => <div>Loading...</div>
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
        <Route
          exact
          path="/submit/confirm-full-consent"
          component={SubmitConfirm}
        />
        <Route
          exact
          path="/submit/confirm-basic-consent"
          component={SubmitConfirm}
        />

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
