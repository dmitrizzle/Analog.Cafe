import React from "react"

import { HEADER_ERRORS, TEXT_EMOJIS } from "../../constants"
import Search from "../components/icons/Search"
import styled from "styled-components"

export const SearchType = styled.span`
  color: #999;
  svg {
    display: inline-block;
    margin: -0.5em 0.25em -0.15em 0.25em;
    height: 1em;
    path {
      stroke: ${props => props.theme.color.brand()};
      stroke-width: 4px;
    }
  }
`

export const CARD_ERRORS = {
  PICTURE_AUTHOR: {
    name: "Unknown Author",
    title: "Info not available",
    text: "This image has been authored by someone not listed in our records…"
  },
  CARD: {
    title: "Info Not Available",
    text: "This card could not be loaded…"
  },
  AUTHOR: {
    text: "Author hasn’t shared any details about her- or himself yet."
  },
  LIST: {
    title: HEADER_ERRORS.ARTICLE.subtitle,
    emoji: TEXT_EMOJIS.WTF
  }
}
export const TEXT_LABELS = {
  SUBSCRIBE: "Subscribe ❤︎",
  SEARCH: (
    <SearchType>
      <Search />
      Search
    </SearchType>
  ),
  FIND: (
    <SearchType style={{ color: "#fff" }}>
      Search <Search />
    </SearchType>
  ),
  SUBMIT: "Subscribe ❤︎"
}
