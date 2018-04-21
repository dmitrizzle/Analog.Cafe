import styled from "styled-components"

// components
import { Quote as QuoteStyles } from "./styles/quote"

// return
export { Header } from "./styles/header"
export { Title } from "./styles/header"
export { Subtitle } from "./styles/header"
export { Byline } from "./styles/header"
export { Article } from "./styles/section"
export { Section } from "./styles/section"
export { TimeStamp } from "./styles/section"
export const Quote = styled.blockquote`
  ${QuoteStyles};
`
