import React from "react"

import { CARD_ERRORS } from "../../../../constants/messages-"
import { TEXT_EMOJIS } from "../../../../../constants"
import ArticleSection from "./ArticleSection"
import ArticleWrapper from "./ArticleWrapper"
import HeaderLarge from "../../../vignettes/HeaderLarge"

export default props => {
  return (
    <ArticleWrapper>
      <HeaderLarge
        pageTitle={
          props.isLoading
            ? props.pastDelay
              ? TEXT_EMOJIS.HUG_RIGHT
              : ""
            : CARD_ERRORS.ARTICLE.title
        }
        pageSubtitle={
          props.isLoading
            ? props.pastDelay
              ? "Loading…"
              : ""
            : CARD_ERRORS.ARTICLE.subtitle
        }
      />
      <ArticleSection style={{ paddingTop: "100vh" }} />
    </ArticleWrapper>
  )
}
