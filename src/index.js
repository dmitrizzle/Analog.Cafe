// tools
import React from "react"
import { render } from "react-dom"
import Helmet from "react-helmet"
import { APP_NAME } from "./constants/app"
import emojis from "./constants/messages/emojis"
// router
import { BrowserRouter } from "react-router-dom"

// redux
import store from "./store"
import { Provider } from "react-redux"

// theme
import Paper from "./themes/Paper"

// components
import App from "./app/containers/App"

// service worker
import registerServiceWorker from "./registerServiceWorker"

// launch!
render(
  <Provider store={store}>
    <BrowserRouter>
      <Paper>
        <Helmet
          defaultTitle={APP_NAME + " " + emojis.STAR}
          titleTemplate={"%s " + emojis.STAR + " " + APP_NAME}
        />
        <App />
      </Paper>
    </BrowserRouter>
  </Provider>,
  window.document.getElementById("app")
)

registerServiceWorker()
