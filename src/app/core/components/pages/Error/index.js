import React from "react"

import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import HeaderLarge from "../../vignettes/HeaderLarge"
import MetaTags from "../../vignettes/MetaTags"

export default props => {
  return (
    <ArticleWrapper>
      <MetaTags metaTitle={props.errorTitle} />
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
