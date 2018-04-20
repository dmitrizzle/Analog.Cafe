// tools
import React from "react"
import { render } from "react-dom"
import Helmet from "./app/core/components/stateless/_async/Helmet"
import { APP_NAME } from "./app/core/constants/app"
import emojis from "./app/core/constants/messages/emojis"
// router
import { BrowserRouter } from "react-router-dom"

// redux
import store from "./store"
import { Provider } from "react-redux"

// theme
import styled, { ThemeProvider } from "styled-components"
import { Sugar } from "@roast-cms/react-sugar-styled"

// components
import App from "./app/core/components/containers/App"

// service worker
import registerServiceWorker from "./registerServiceWorker"

// polyfill
import { arrayIncludes, arrayFind } from "./app/core/utils/polyfill"
arrayIncludes()
arrayFind()

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
const glazed = {
  color_brand: "rgb(237, 35, 110)",
  color_foreground: "rgb(44, 44, 44)",
  color_highlight: "rgb(255, 242, 0)",
  //
  font_heading: "'Exo 2', Arial, sans-serif",
  font_heading_weight: 600,
  //
  font_body: "'Lora', Georgia, serif",
  //
  size_base: 20,
  size_column_medium: 750,
  size_column_large: 820,
  size_block_padding: 1.5,
  size_block_spacing: 1,
  size_block_border: 8,
  //
  effects_border_radius: 0.5
}

// launch!
render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider
        theme={{
          ...Sugar(glazed),
          elements: {
            thickBorder: () =>
              glazed.size_block_border + "px solid " + glazed.color_foreground
          },
          size: {
            ...Sugar(glazed).size,
            font: {
              ...Sugar(glazed).size.font,
              make: {
                ...Sugar(glazed).size.font.make,
                larger: 3,
                tiny: 0.65
              }
            }
          }
        }}
      >
        <GlobalStyles>
          <Helmet
            defaultTitle={APP_NAME}
            titleTemplate={"%s " + emojis.TITLE_SEPARATOR + " " + APP_NAME}
          />
          <App />
        </GlobalStyles>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  window.document.getElementById("app")
)

registerServiceWorker()
