// tools
import React from "react"

// styles
import Heading from "../ArticleHeading"
import { Section, Article } from "../ArticleStyles"
import emojis from "../../../constants/messages/emojis"
import errorMessages from "../../../constants/messages/errors"

// return
export default props => {
  return (
    <Article>
      <Heading
        pageTitle={
          props.isLoading
            ? props.pastDelay ? emojis.HUG_RIGHT : "‌"
            : errorMessages.VIEW_TEMPLATE.ARTICLE.title
        }
        pageSubtitle={
          props.isLoading
            ? props.pastDelay ? "Loading…" : "‌"
            : errorMessages.VIEW_TEMPLATE.ARTICLE.subtitle
        }
      />
      <Section style={{ paddingTop: "100vh" }} />
    </Article>
  )
}
