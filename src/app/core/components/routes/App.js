import { Redirect, Route, Switch } from "react-router-dom"
import Loadable from "react-loadable"
import React from "react"

import { ROUTE_URL_USER_SUBMISSIONS } from "../../../user/constants/routes-session"
import ArticleLoader from "../pages/Article/components/ArticleLoader"
import ListLoader from "../pages/List/components/ListLoader"
import PrivacySettings from "../../../user/components/pages/PrivacySettings"
import SignOut from "../../../user/components/pages/SignOut"

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

const MustReads = Loadable({
  loader: () => import("../../../user/components/pages/MustReads"),
  loading: ArticleLoader,
  delay: 100
})

const MyFavourites = Loadable({
  loader: () => import("../../../user/components/pages/MyFavourites"),
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
        {/* REDIRECTS */}
        <Redirect
          from="/zine/vitessa-fzyi"
          to="/zine/voigtlander-vitessa-l-fzyi"
        />
        <Redirect
          from="/zine/analogue-photography-98f3"
          to="/zine/a-beginners-guide-to-film-photography-zq0f"
        />
        <Redirect
          from="/zine/a-beginner's-guide-to-film-photography-zq0f"
          to="/zine/a-beginners-guide-to-film-photography-zq0f"
        />
        <Redirect from="/subscribe" to="/sign-in" />
        <Redirect from="/author/:id" to="/is/:id" />
        {/* DYNAMIC VIEWS */}
        <Route exact path="/is" component={NotFound} />
        <Route exact path="/zine" component={NotFound} />

        <Route exact path="/is/*" component={List} />
        <Route exact path="/zine/*" component={Article} />
        {/* MAGAZINE SECTIONS */}
        <Route exact path="/" component={List} />
        <Route exact path="/film-photography" component={List} />
        <Route exact path="/photo-essays" component={List} />
        <Route exact path="/editorials" component={List} />
        <Route exact path="/unclassifieds" component={List} />
        <Route exact path="/collaborations" component={List} />
        <Route exact path="/solo-projects" component={List} />
        {/* AUTH VIEWS */}
        <Route exact path={ROUTE_URL_USER_SUBMISSIONS} component={Me} />
        <Route exact path={"/favourites"} component={MyFavourites} />
        <Route exact path={`/admin`} component={Admin} />
        <Route exact path="/submissions/*" component={Article} />
        <Route exact path={`/profile/edit`} component={EditProfile} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-out" component={SignOut} />
        {/* STATIC VIEWS */}
        <Route exact path="/resources" component={MustReads} />
        <Route exact path="/about" component={About} />
        <Route path="/submit" component={Submit} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/privacy-settings" component={PrivacySettings} />
        <Route state={{ status: "404" }} component={NotFound} />
      </Switch>
    </main>
  )
}
