import React from "react"

import { Article, Section } from "../styles/ArticleStyles"
import Heading from "./ArticleHeading"
import EMOJI from "../../constants/EMOJI"
import errorMessages from "../../../user/constants/errors"

// return
export default props => {
  return (
    <Article>
      <Heading
        pageTitle={
          props.isLoading
            ? props.pastDelay
              ? EMOJI.HUG_RIGHT
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
