import styled from "styled-components"

import ArticleQuote from "../../Article/components/ArticleQuote"

export default styled(ArticleQuote)`
  font-style: normal !important;
  &::first-letter {
    font-size: inherit !important;
    font-weight: inherit !important;
    float: none !important;
    margin: 0 !important;
  }
  &::before,
  &::after {
    content: "" !important;
  }
`
