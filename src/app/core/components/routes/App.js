import { Redirect, Route, Switch } from "react-router-dom"
import Loadable from "react-loadable"
import React from "react"

import { ROUTE_URL_USER_LANDING } from "../../../user/constants/routes-session"
import ArticleLoader from "../pages/Article/components/ArticleLoader"
import ListLoader from "../pages/List/components/ListLoader"
import PrivacySettings from "../../../user/components/pages/PrivacySettings"
import SignOut from "../../../user/components/pages/SignOut"
import Subscribe from "../pages/Subscribe"

const List = Loadable({
  loader: () => import("../pages/List"),
  loading: ListLoader
})
const Article = Loadable({
  loader: () => import("../pages/Article"),
  loading: ArticleLoader,
  delay: 100
})
const EditProfile = Loadable({
  loader: () => import("../../../user/components/pages/EditProfile"),
  loading: ArticleLoader,
  delay: 100
})
const About = Loadable({
  loader: () => import("../pages/About"),
  loading: ArticleLoader,
  delay: 100
})
const SignIn = Loadable({
  loader: () => import("../../../user/components/pages/SignIn"),
  loading: ArticleLoader,
  delay: 100
})
const Me = Loadable({
  loader: () => import("../../../user/components/pages/Me"),
  loading: ArticleLoader,
  delay: 100
})
const Admin = Loadable({
  loader: () => import("../../../admin/components/pages/Admin"),
  loading: ArticleLoader,
  delay: 100
})
const Submit = Loadable({
  loader: () => import("../../../user/components/routes/Submit"),
  loading: ArticleLoader,
  delay: 100
})
const NotFound = Loadable({
  loader: () => import("../pages/Error/components/NotFound"),
  loading: ArticleLoader,
  delay: 100
})

const PrivacyPolicy = Loadable({
  loader: () => import("../../../user/components/pages/PrivacyPolicy"),
  loading: ArticleLoader,
  delay: 100
})

const Resources = Loadable({
  loader: () => import("../pages/Resources"),
  loading: ArticleLoader,
  delay: 100
})

export default () => {
  return (
    <main
      style={{
        transform: "translateZ(0)",
        marginTop: "-8em",
        paddingTop: "8em"
      }}
    >
      <Switch>
        {/**
         * dynamic urls and views
         */}
        <Route
          exact
          path="/zine/vitessa-fzyi"
          render={() => <Redirect to="/zine/voigtlander-vitessa-l-fzyi" />}
        />
        <Route
          exact
          path="/zine/analogue-photography-98f3"
          render={() => (
            <Redirect to="/zine/a-beginners-guide-to-film-photography-zq0f" />
          )}
        />
        <Route
          exact
          path="/zine/a-beginner's-guide-to-film-photography-zq0f"
          render={() => (
            <Redirect to="/zine/a-beginners-guide-to-film-photography-zq0f" />
          )}
        />
        {/**/}
        <Route exact path="/author" component={NotFound} />
        <Route exact path="/zine" component={NotFound} />
        <Route exact path="/author/*" component={List} />
        <Route exact path="/zine/*" component={Article} />
        <Route exact path="/articles" render={() => <Redirect to="/" />} />
        {/**
         * new magazine sections
         */}
        <Route exact path="/" component={List} />
        <Route exact path="/film-photography" component={List} />
        <Route exact path="/photo-essays" component={List} />
        <Route exact path="/editorials" component={List} />
        <Route exact path="/unclassifieds" component={List} />
        <Route exact path="/collaborations" component={List} />
        <Route exact path="/solo-projects" component={List} />
        {/**
         * auth views
         */}
        <Route exact path={ROUTE_URL_USER_LANDING} component={Me} />
        <Route exact path={`/admin`} component={Admin} />
        <Route exact path="/submissions/*" component={Article} />
        <Route exact path={`/profile/edit`} component={EditProfile} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-out" component={SignOut} />
        {/**
         * static views and urls
         */}
        <Route exact path="/resources" component={Resources} />
        <Route exact path="/about" component={About} />
        <Route path="/submit" component={Submit} />
        <Route path="/subscribe" render={() => <Subscribe cached />} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/privacy-settings" component={PrivacySettings} />
        <Route state={{ status: "404" }} component={NotFound} />
      </Switch>
    </main>
  )
}
