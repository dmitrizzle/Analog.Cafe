// tools
import React from "react"
import { Switch, Route } from "react-router-dom"

// views
  // dynamic
import List from "../../containers/List"
import Post from "../../containers/Post"
import NotFound from "../../containers/NotFound"
import SignIn from "../../containers/auth/SignIn"
  // static
import { About } from "./"
import AppRoutesSubmit from "./AppRoutesSubmit"

// render
export default props => {
  return(
    <main>
      <Switch>

        {/* dynamic urls and views */}
        <Route exact path="/author/*"			component={ List } />
        <Route exact path="/zine/*"				component={ Post } />

        {/* dynamic views, static urls */}
        <Route exact path="/"             component={ List } />
        <Route exact path="/photo-essays"	component={ List } />
        <Route exact path="/articles"			component={ List } />

        {/* auth views */}
        <Route exact path="/my-stuff"			component={ List } />
        <Route exact path="/sign-in"      component={ SignIn } />

        {/* static views and urls */}
        <Route exact path="/about"        component= { About } />
        <Route path="/submit"             component= { AppRoutesSubmit } />
        <Route state={{"status":"404"}}   component={ NotFound } />


      </Switch>
    </main>
  )
}
