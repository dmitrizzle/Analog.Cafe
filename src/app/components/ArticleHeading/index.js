// tools
import React from "react"
import toTitleCase from "titlecase"

// styles
import { Header, Title, Subtitle } from "../ArticleStyles"

// return
export default props => {
  return (
    <Header>
      {props.pageTitle &&
        <Title>
          {toTitleCase(props.pageTitle)}
        </Title>}
      {props.pageSubtitle &&
        <Subtitle>
          {toTitleCase(props.pageSubtitle)}
        </Subtitle>}
      {props.children}
    </Header>
  )
}
