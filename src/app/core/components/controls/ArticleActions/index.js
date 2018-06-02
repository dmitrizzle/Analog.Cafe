import React from "react"

import {
  getHumanDatestamp,
  getISODatestamp,
  getLunarDatestamp
} from "../../../utils/messages-"
import Options from "./components/Options"
import TimeStamp from "../../pages/Article/components/TimeStamp"

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
      <Options {...props} />
    </div>
  )
}
