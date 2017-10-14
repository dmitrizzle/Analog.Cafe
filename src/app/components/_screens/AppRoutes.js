// tools
import React from "react"
import Loadable from "react-loadable"
import { Switch, Route } from "react-router-dom"

// views
import AsyncListLoader from "./AsyncListLoader"
import AsyncArticleLoader from "./AsyncArticleLoader"

import { ROUTE_AUTH_USER_LANDING } from "../../../constants/user"

// components
import SignOut from "../../containers/_screens-auth/SignOut"

const AsyncList = Loadable({
  loader: () => import("../../containers/List"),
  loading: AsyncListLoader
})
const AsyncArticle = Loadable({
  loader: () => import("../../containers/Article"),
  loading: AsyncArticleLoader,
  delay: 100
})
const AsyncEditProfile = Loadable({
  loader: () => import("../../containers/_screens-auth/EditProfile"),
  loading: AsyncArticleLoader,
  delay: 100
})
const AsyncAbout = Loadable({
  loader: () => import("./About"),
  loading: AsyncArticleLoader,
  delay: 100
})
const AsyncSignIn = Loadable({
  loader: () => import("../../containers/_screens-auth/SignIn"),
  loading: AsyncArticleLoader,
  delay: 100
})
const AsyncMe = Loadable({
  loader: () => import("../../containers/_screens-auth/Me"),
  loading: AsyncArticleLoader,
  delay: 100
})
const AsyncAppRoutesSubmit = Loadable({
  loader: () => import("./AppRoutesSubmit"),
  loading: AsyncArticleLoader,
  delay: 100
})
const AsyncNotFound = Loadable({
  loader: () => import("../../containers/_screens-errors/NotFound"),
  loading: AsyncArticleLoader,
  delay: 100
})

// render
export default props => {
  return (
    <main>
      <Switch>
        {/* dynamic urls and views */}
        <Route exact path="/author" component={AsyncNotFound} />
        <Route exact path="/zine" component={AsyncNotFound} />
        <Route exact path="/author/*" component={AsyncList} />
        <Route exact path="/zine/*" component={AsyncArticle} />

        {/* dynamic views, static urls */}
        <Route exact path="/" component={AsyncList} />
        <Route exact path="/photo-essays" component={AsyncList} />
        <Route exact path="/articles" component={AsyncList} />
        <Route exact path="/stories" component={AsyncList} />
        <Route exact path="/editorials" component={AsyncList} />
        <Route exact path="/guides" component={AsyncList} />
        <Route exact path="/reviews" component={AsyncList} />

        {/* auth views */}
        <Route exact path={ROUTE_AUTH_USER_LANDING} component={AsyncMe} />
        <Route
          exact
          path={ROUTE_AUTH_USER_LANDING + "/edit"}
          component={AsyncEditProfile}
        />
        <Route exact path="/sign-in" component={AsyncSignIn} />
        <Route exact path="/sign-out" component={SignOut} />

        {/* static views and urls */}
        <Route exact path="/about" component={AsyncAbout} />
        <Route path="/submit" component={AsyncAppRoutesSubmit} />
        <Route state={{ status: "404" }} component={AsyncNotFound} />
      </Switch>
    </main>
  )
}
