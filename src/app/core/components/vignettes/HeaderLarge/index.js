import React from "react"
import toTitleCase from "titlecase"

import HeaderSubtitle from "./components/HeaderSubtitle"
import HeaderTitle from "./components/HeaderTitle"
import HeaderWrapper from "./components/HeaderWrapper"
import Link from "../../controls/Link"

const HeaderTitleAssembly = props => (
  <HeaderTitle title={props.title}>
    {props.noTitleCase ? props.pageTitle : toTitleCase(props.pageTitle)}
  </HeaderTitle>
)
export default props => {
  return (
    <HeaderWrapper {...props}>
      {props.titleLinkTo ? (
        <Link to={props.titleLinkTo} style={{ textDecoration: "none" }}>
          <HeaderTitleAssembly {...props} />
        </Link>
      ) : (
        <HeaderTitleAssembly {...props} />
      )}

      {props.pageSubtitle && (
        <HeaderSubtitle>
          {props.noTitleCase
            ? props.pageSubtitle
            : toTitleCase(props.pageSubtitle)}
        </HeaderSubtitle>
      )}
      {props.children}
    </HeaderWrapper>
  )
}
