import { BrowserRouter } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Provider } from "react-redux"
import { render } from "react-dom"
import React from "react"
import styled, { ThemeProvider } from "styled-components"

import { APP_NAME, TEXT_EMOJIS } from "./app/constants"
import { APP_THEME } from "./constants"
import { polyfillArrayFind, polyfillArrayIncludes } from "./app/utils"
import App from "./app"
import registerServiceWorker from "./registerServiceWorker"
import store from "./app/store"

polyfillArrayIncludes()
polyfillArrayFind()

const GlobalStyles = styled.div`
  color: ${props => props.theme.color.foreground()};
  a {
    color: inherit;
    &:active {
      background: ${props => props.theme.color.highlight()};
      color: ${props => props.theme.color.foreground()};
    }
    text-decoration-skip: ink;
    -webkit-text-decoration-skip: ink;
  }
  *::selection {
    background: ${props => props.theme.color.highlight()};
  }
  a,
  button,
  textarea {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`

render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={APP_THEME}>
        <GlobalStyles>
          <Helmet
            defaultTitle={APP_NAME}
            titleTemplate={"%s " + TEXT_EMOJIS.TITLE_SEPARATOR + " " + APP_NAME}
          />
          <App />
        </GlobalStyles>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  window.document.getElementById("app")
)
registerServiceWorker()

// FullStory init
window["_fs_debug"] = false
window["_fs_host"] = "fullstory.com"
window["_fs_org"] = "J92ZK"
window["_fs_namespace"] = "FS"
;(function(m, n, e, t, l, o, g, y) {
  if (e in m) {
    if (m.console && m.console.log) {
      m.console.log(
        'FullStory namespace conflict. Please set window["_fs_namespace"].'
      )
    }
    return
  }
  g = m[e] = function(a, b, s) {
    g.q ? g.q.push([a, b, s]) : g._api(a, b, s)
  }
  g.q = []
  o = n.createElement(t)
  o.async = 1
  o.src = "https://" + window["_fs_host"] + "/s/fs.js"
  y = n.getElementsByTagName(t)[0]
  y.parentNode.insertBefore(o, y)
  g.identify = function(i, v, s) {
    g(l, { uid: i }, s)
    if (v) g(l, v, s)
  }
  g.setUserVars = function(v, s) {
    g(l, v, s)
  }
  g.event = function(i, v, s) {
    g("event", { n: i, p: v }, s)
  }
  g.shutdown = function() {
    g("rec", !1)
  }
  g.restart = function() {
    g("rec", !0)
  }
  g.consent = function(a) {
    g("consent", !arguments.length || a)
  }
  g.identifyAccount = function(i, v) {
    o = "account"
    v = v || {}
    v.acctId = i
    g(o, v)
  }
  g.clearUserCookie = function() {}
})(window, document, window["_fs_namespace"], "script", "user")
