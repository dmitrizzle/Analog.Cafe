import { Helmet } from "react-helmet"
import React from "react"

import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import HeaderLarge from "../../vignettes/HeaderLarge"

export default props => {
  return (
    <ArticleWrapper>
      <Helmet>
        <title>{props.errorTitle}</title>
      </Helmet>
      <HeaderLarge
        pageTitle={props.errorTitle}
        pageSubtitle={props.errorSubtitle}
        title={props.errorDetails}
      />
      <ArticleSection>
        <p style={{ textAlign: "center" }}>{props.children}</p>
      </ArticleSection>
    </ArticleWrapper>
  )
}
