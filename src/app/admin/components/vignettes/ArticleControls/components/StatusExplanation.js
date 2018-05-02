import React from "react"

import {
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../../../../../core/constants/routes-article"
import { TEXT_EMOJIS } from "../../../../../constants"
import Byline from "../../../../../core/components/vignettes/Byline"
import Link from "../../../../../core/components/controls/Link"

export default props => {
  return (
    <Byline
      style={{
        display: "block"
      }}
    >
      {(props.article.status === "scheduled" ||
        props.article.status === "published") && (
        <span style={{ fontStyle: "normal" }} role="img" aria-label="Notice">
          {TEXT_EMOJIS.WARNING}
        </span>
      )}{" "}
      {props.article.status === "scheduled" &&
        "This is a SCHEDULED submission that you can edit while it is in the queue."}
      {props.article.status === "published" &&
        props.article.articleId && (
          <span>
            This is an <strong>original submission</strong>, linked with{" "}
            <Link to={`${ROUTE_URL_ARTICLES}/${props.article.slug}`}>
              this published article
            </Link>. You can edit it and then sync your changes to the published
            article.
          </span>
        )}
      {props.article.status === "published" &&
        !props.article.articleId && (
          <span>
            This is a <strong>published article</strong>, linked with{" "}
            <Link to={`${ROUTE_URL_SUBMISSIONS}/${props.article.slug}`}>
              this submission
            </Link>. Your edits will be applied to that submission, which you
            can then sync with this article.
          </span>
        )}
    </Byline>
  )
}
