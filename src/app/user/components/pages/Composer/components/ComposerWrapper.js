import React from "react"

import ArticleWrapper from "../../../../../core/components/pages/Article/components/ArticleWrapper"
import MetaTags from "../../../../../core/components/vignettes/MetaTags"

export default props => {
  return (
    <ArticleWrapper>
      <MetaTags
        metaTitle="Composer"
        metaDescription="A tool to upload, edit and submit your photo essays and stories."
      />
      {props.children}
    </ArticleWrapper>
  )
}
