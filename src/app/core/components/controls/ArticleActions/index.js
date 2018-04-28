import React from "react"

import { TimeStamp } from "../../styles/ArticleStyles"
import {
  getHumanDatestamp,
  getISODatestamp,
  getLunarDatestamp
} from "../../../utils/messages-"
import NextArticle from "./components/NextArticle"
import ShareButtons from "./components/ShareButtons"

const DatePublished = props => {
  return (
    <TimeStamp
      dateTime={getISODatestamp(props.thisArticlePostDate)}
      itemprop="datePublished"
      title={
        "Published on " + getHumanDatestamp(props.thisArticlePostDate) + "."
      }
    >
      {getLunarDatestamp(props.thisArticlePostDate)}
    </TimeStamp>
  )
}

export default props => {
  return (
    <div style={{ clear: "both" }}>
      {props.thisArticlePostDate && <DatePublished {...props} />}
      <ShareButtons {...props} />
      <NextArticle {...props} />
    </div>
  )
}
