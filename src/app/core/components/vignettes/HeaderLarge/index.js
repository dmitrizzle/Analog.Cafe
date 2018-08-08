import React from "react"
import toTitleCase from "titlecase"

import HeaderSubtitle from "./components/HeaderSubtitle"
import HeaderTitle from "./components/HeaderTitle"
import HeaderWrapper from "./components/HeaderWrapper"

export default props => {
  return (
    <HeaderWrapper>
      <HeaderTitle
        title={props.title}
        itemProp={props.itemPropHeadline ? "headline" : null}
      >
        {toTitleCase(props.pageTitle)}
      </HeaderTitle>
      {props.pageSubtitle && (
        <HeaderSubtitle>{toTitleCase(props.pageSubtitle)}</HeaderSubtitle>
      )}
      {props.children}
    </HeaderWrapper>
  )
}
