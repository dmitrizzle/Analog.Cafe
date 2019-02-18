import React from "react"

import { HEADER_ERRORS, TEXT_EMOJIS } from "../../constants"
import Search from "../components/icons/Search"
import styled from "styled-components"

export const SearchType = styled.span`
  color: #999;
  padding-left: 1em;
  svg {
    display: inline-block;
    margin: -0.5em 0.25em -0.15em 0;
    height: 1em;
    path {
      fill: #999 !important;
      stroke: #999 !important;
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
  SUBSCRIBE: "Email Newsletter ❤︎",
  SEARCH: (
    <SearchType>
      Search <Search />
    </SearchType>
  ),
  FIND: (
    <SearchType style={{ color: "#fff" }}>
      Search <Search />
    </SearchType>
  ),
  SUBMIT_EMAIL_ADDR: "Subscribe ❤︎"
}
