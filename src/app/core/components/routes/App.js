import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"
import React from "react"

import { ROUTE_AUTH_USER_LANDING } from "../../../../user/constants/user"
import ArticleLoader from "../_async/ArticleLoader"
import ListLoader from "../_async/ListLoader"
import SignOut from "../../../../user/components/pages/SignOut"

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
  loader: () => import("../../../../user/components/pages/EditProfile"),
  loading: ArticleLoader,
  delay: 100
})
const About = Loadable({
  loader: () => import("./About"),
  loading: ArticleLoader,
  delay: 100
})
const SignIn = Loadable({
  loader: () => import("../../../../user/components/pages/SignIn"),
  loading: ArticleLoader,
  delay: 100
})
const Me = Loadable({
  loader: () => import("../../../../user/components/pages/Me"),
  loading: ArticleLoader,
  delay: 100
})
const Admin = Loadable({
  loader: () => import("../../containers/_screens-auth/Admin"),
  loading: ArticleLoader,
  delay: 100
})
const AppRoutesSubmit = Loadable({
  loader: () => import("../../../../user/components/routes/Submit"),
  loading: ArticleLoader,
  delay: 100
})
const NotFound = Loadable({
  loader: () => import("../../containers/_screens-errors/NotFound"),
  loading: ArticleLoader,
  delay: 100
})

export default () => {
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

        <Route exact path="/collaborations" component={List} />
        <Route exact path="/solo-projects" component={List} />

        {/* auth views */}
        <Route exact path={ROUTE_AUTH_USER_LANDING} component={Me} />
        <Route
          exact
          path={`${ROUTE_AUTH_USER_LANDING}/admin`}
          component={Admin}
        />
        <Route exact path="/submissions/*" component={Article} />
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
        <Route state={{ status: "404" }} component={NotFound} />
      </Switch>
    </main>
  )
}
