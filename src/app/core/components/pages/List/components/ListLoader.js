import React from "react"

import { APP_NAME, TEXT_EMOJIS } from "../../../../../constants"
import { CARD_ERRORS } from "../../../../constants/messages-"
import ArticleSection from "../../Article/components/ArticleSection"
import ArticleWrapper from "../../Article/components/ArticleWrapper"
import ListBrandName from "./ListBrandName"
import ListDescriptionWrapper from "./ListDescriptionWrapper"
import ListHeader from "./ListHeader"

export default props => {
  return [
    <ListDescriptionWrapper key="ListLoader_description">
      <ListBrandName>{APP_NAME}</ListBrandName>
      {props.pastDelay && (
        <ListHeader>
          <q>
            <em>{props.isLoading ? "Loading…" : CARD_ERRORS.LIST.title}</em>
          </q>{" "}
          {props.isLoading ? TEXT_EMOJIS.HUG_RIGHT : CARD_ERRORS.LIST.emoji}
        </ListHeader>
      )}
    </ListDescriptionWrapper>,
    <ArticleWrapper key="ListLoader_article">
      <ArticleSection style={{ paddingTop: "100vh" }} />
    </ArticleWrapper>
  ]
}
