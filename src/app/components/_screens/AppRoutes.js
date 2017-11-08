// tools
import React from "react"
import Loadable from "react-loadable"
import { Switch, Route } from "react-router-dom"

// views
import ListLoader from "../_async/ListLoader"
import ArticleLoader from "../_async/ArticleLoader"

import { ROUTE_AUTH_USER_LANDING } from "../../../constants/user"

// components
import SignOut from "../../containers/_screens-auth/SignOut"

const List = Loadable({
  loader: () => import("../../containers/List"),
  loading: ListLoader
})
const Article = Loadable({
  loader: () => import("../../containers/Article"),
  loading: ArticleLoader,
  delay: 100
})
const EditProfile = Loadable({
  loader: () => import("../../containers/_screens-auth/EditProfile"),
  loading: ArticleLoader,
  delay: 100
})
const About = Loadable({
  loader: () => import("./About"),
  loading: ArticleLoader,
  delay: 100
})
const SignIn = Loadable({
  loader: () => import("../../containers/_screens-auth/SignIn"),
  loading: ArticleLoader,
  delay: 100
})
const Me = Loadable({
  loader: () => import("../../containers/_screens-auth/Me"),
  loading: ArticleLoader,
  delay: 100
})
const AppRoutesSubmit = Loadable({
  loader: () => import("./AppRoutesSubmit"),
  loading: ArticleLoader,
  delay: 100
})
const NotFound = Loadable({
  loader: () => import("../../containers/_screens-errors/NotFound"),
  loading: ArticleLoader,
  delay: 100
})

// render
export default props => {
  return (
    <main>
      <Switch>
        {/* dynamic urls and views */}
        <Route exact path="/author" component={NotFound} />
        <Route exact path="/zine" component={NotFound} />
        <Route exact path="/author/*" component={List} />
        <Route exact path="/zine/*" component={Article} />

        {/* dynamic views, static urls */}
        <Route exact path="/" component={List} />
        <Route exact path="/photo-essays" component={List} />
        <Route exact path="/articles" component={List} />
        <Route exact path="/stories" component={List} />
        <Route exact path="/editorials" component={List} />
        <Route exact path="/guides" component={List} />
        <Route exact path="/reviews" component={List} />

        {/* auth views */}
        <Route exact path={ROUTE_AUTH_USER_LANDING} component={Me} />
        <Route
          exact
          path={ROUTE_AUTH_USER_LANDING + "/edit"}
          component={EditProfile}
        />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-out" component={SignOut} />

        {/* static views and urls */}
        <Route exact path="/about" component={About} />

        <Route path="/submit" component={AppRoutesSubmit} />
        <Route path="/beta" component={AppRoutesSubmit} />

        <Route state={{ status: "404" }} component={NotFound} />
      </Switch>
    </main>
  )
}
