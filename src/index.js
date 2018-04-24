import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { Sugar } from "@roast-cms/react-sugar-styled"
import { render } from "react-dom"
import React from "react"
import styled, { ThemeProvider } from "styled-components"

import { APP_NAME, TEXT_EMOJIS } from "./app/constants"
import {
  polyfillArrayFind,
  polyfillArrayIncludes
} from "./app/core/utils/polyfill"
import App from "./app"
import Helmet from "./app/core/components/vignettes/Helmet"
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
