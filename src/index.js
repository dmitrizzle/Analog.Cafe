// tools
import React from "react"
import { render } from "react-dom"
import Helmet from "./app/components/_async/Helmet"
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

// polyfill
import { arrayIncludes } from "./utils/polyfill"
arrayIncludes()

// launch!
render(
  <Provider store={store}>
    <BrowserRouter>
      <Paper>
        <Helmet
          defaultTitle={APP_NAME}
          titleTemplate={"%s " + emojis.TITLE_SEPARATOR + " " + APP_NAME}
        />
        <App />
      </Paper>
    </BrowserRouter>
  </Provider>,
  window.document.getElementById("app")
)

registerServiceWorker()
