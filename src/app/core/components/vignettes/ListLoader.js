import React from "react"

import { Article, Section } from "../styles/ArticleStyles"
import { CARD_ERRORS } from "../../constants/messages-"
import { ListDescription, ListHeader } from "./ListDescription"
import { TEXT_EMOJIS } from "../../../constants"

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
    <Article key="ListLoader_Article">
      <Section style={{ paddingTop: "100vh" }} />
    </Article>
  ]
}
