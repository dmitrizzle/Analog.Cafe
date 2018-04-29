import React from "react"

import { CARD_ERRORS } from "../../constants/messages-"
import { ListDescription, ListHeader } from "./ListDescription"
import { TEXT_EMOJIS } from "../../../constants"
import ArticleSection from "../pages/Article/components/ArticleSection"
import ArticleWrapper from "../pages/Article/components/ArticleWrapper"

// return
export default props => {
  return [
    <ListDescription key="ListLoader_ListDescription">
      {props.pastDelay && (
        <ListHeader>
          <q>
            <em>{props.isLoading ? "Loading…" : CARD_ERRORS.LIST.title}</em>
          </q>{" "}
          {props.isLoading ? TEXT_EMOJIS.HUG_RIGHT : CARD_ERRORS.LIST.emoji}
        </ListHeader>
      )}
    </ListDescription>,
    <ArticleWrapper key="ListLoader_Article">
      <ArticleSection style={{ paddingTop: "100vh" }} />
    </ArticleWrapper>
  ]
}
