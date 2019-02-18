import React from "react"

import {
  getHumanDatestamp,
  getISODatestamp,
  getLunarDatestamp
} from "../../../utils/messages-"
import ArticleActionsWrapper from "./components/ArticleActionsWrapper"
import Link from "../Link"
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
    <ArticleActionsWrapper>
      {props.thisArticlePostDate && <DatePublished {...props} />}

      {props.user &&
        props.user.status === "ok" &&
        (props.user.info.role === "admin" ||
          props.article.submittedBy.id === props.user.info.id) &&
        props.article.edits !== undefined &&
        props.article.edits.length > 0 && (
          <div style={{ lineHeight: "1em" }}>
            <strong>Edit History</strong>
            <br />
            {props.article.edits.map(edit => {
              const unix = new Date(edit.date * 1000)

              return (
                <React.Fragment key={edit.date}>
                  <small style={{ opacity: 0.5 }}>
                    {dateFactory(edit.date).human +
                      " " +
                      unix.getHours() +
                      ":" +
                      unix.getMinutes()}{" "}
                    – <Link to={`/author/${edit.id}`}>{edit.name}</Link>
                  </small>
                  <br />
                </React.Fragment>
              )
            })}
          </div>
        )}

      {props.article &&
        props.article.status === "published" &&
        typeof props.article.scheduledOrder === "undefined" && (
          <Options {...props} />
        )}
    </ArticleActionsWrapper>
  )
}
