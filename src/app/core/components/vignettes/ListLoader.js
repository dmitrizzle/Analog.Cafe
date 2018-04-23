import React from "react"

import { Article, Section } from "../styles/ArticleStyles"
import { ListDescription, ListHeader } from "./ListDescription"
import EMOJI from "../../constants/EMOJI"
import errorMessages from "../../../user/constants/errors"

// return
export default props => {
  return [
    <ListDescription key="ListLoader_ListDescription">
      {props.pastDelay && (
        <ListHeader>
          <q>
            <em>
              {props.isLoading
                ? "Loading…"
                : errorMessages.VIEW_TEMPLATE.LIST.title}
            </em>
          </q>{" "}
          {props.isLoading
            ? EMOJI.HUG_RIGHT
            : errorMessages.VIEW_TEMPLATE.LIST.emoji}
        </ListHeader>
      )}
    </ListDescription>,
    <Article key="ListLoader_Article">
      <Section style={{ paddingTop: "100vh" }} />
    </Article>
  ]
}
