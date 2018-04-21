import React from "react"
import toTitleCase from "titlecase"

import { Header, Subtitle, Title } from "../../styles/ArticleStyles"

// styles

// return
export default props => {
  return (
    <Header>
      <Title title={props.title}>{toTitleCase(props.pageTitle)}</Title>
      {props.pageSubtitle && (
        <Subtitle>{toTitleCase(props.pageSubtitle)}</Subtitle>
      )}
      {props.children}
    </Header>
  )
}
