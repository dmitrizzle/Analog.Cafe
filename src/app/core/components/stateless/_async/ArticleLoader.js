// tools
import React from "react"

import { Section, Article } from "../ArticleStyles"
import Heading from "../ArticleHeading"
import emojis from "../../../constants/emojis"
import errorMessages from "../../../../user/constants/errors"

// return
export default props => {
  return (
    <Article>
      <Heading
        pageTitle={
          props.isLoading
            ? props.pastDelay
              ? emojis.HUG_RIGHT
              : ""
            : errorMessages.VIEW_TEMPLATE.ARTICLE.title
        }
        pageSubtitle={
          props.isLoading
            ? props.pastDelay
              ? "Loading…"
              : ""
            : errorMessages.VIEW_TEMPLATE.ARTICLE.subtitle
        }
      />
      <Section style={{ paddingTop: "100vh" }} />
    </Article>
  )
}
