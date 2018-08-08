import React from "react"

import {
  getHumanDatestamp,
  getISODatestamp,
  getLunarDatestamp
} from "../../../utils/messages-"
import Options from "./components/Options"
import TimeStamp from "../../pages/Article/components/TimeStamp"

export const dateFactory = unix => {
  return {
    unix: unix,
    iso: getISODatestamp(unix),
    human: getHumanDatestamp(unix),
    lunar: getLunarDatestamp(unix)
  }
}
const DatePublished = props => {
  const dateModified =
    props.thisArticleEditDate &&
    props.thisArticleEditDate !== props.thisArticlePostDate
      ? dateFactory(props.thisArticleEditDate)
      : null
  const datePublished = dateFactory(props.thisArticlePostDate)
  return (
    <TimeStamp>
      <time title={`Published on ${datePublished.human}.`}>
        {datePublished.lunar}
      </time>
      {dateModified && [
        <span key="divider"> ✏︎ </span>,
        <time key="tiemstamp" title={`Edited on on ${dateModified.human}.`}>
          {dateModified.lunar}
        </time>
      ]}
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
