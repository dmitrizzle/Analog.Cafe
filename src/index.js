import { BrowserRouter } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Provider } from "react-redux"
import { render } from "react-dom"
import React from "react"
import styled, { ThemeProvider } from "styled-components"

import smoothscroll from "smoothscroll-polyfill"

import { APP_NAME, TEXT_EMOJIS } from "./app/constants"
import { APP_THEME } from "./constants"
import { polyfillArrayFind, polyfillArrayIncludes } from "./app/utils"
import App from "./app"
import registerServiceWorker from "./registerServiceWorker"
import store from "./app/store"

smoothscroll.polyfill()
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
