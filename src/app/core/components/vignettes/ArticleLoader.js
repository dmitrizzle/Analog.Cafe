import React from "react"

import { Article, Section } from "../styles/ArticleStyles"
import { CARD_ERRORS } from "../../constants/messages-"
import { TEXT_EMOJIS } from "../../../constants"
import Heading from "./ArticleHeading"

// return
export default props => {
  return (
    <Article>
      <Heading
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
      <Section style={{ paddingTop: "100vh" }} />
    </Article>
  )
}
