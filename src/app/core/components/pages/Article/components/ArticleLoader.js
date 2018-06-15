import React from "react"

import { TEXT_EMOJIS } from "../../../../../constants"
import ArticleSection from "./ArticleSection"
import ArticleWrapper from "./ArticleWrapper"
import HeaderLarge from "../../../vignettes/HeaderLarge"

export default props => {
  return (
    <ArticleWrapper>
      <HeaderLarge
        pageTitle={
          props.isLoading ? (props.pastDelay ? TEXT_EMOJIS.HUG_RIGHT : "") : ""
        }
        pageSubtitle={
          props.isLoading ? (props.pastDelay ? "Loading…" : "") : ""
        }
      />
      <ArticleSection style={{ paddingTop: "100vh" }} />
    </ArticleWrapper>
  )
}
