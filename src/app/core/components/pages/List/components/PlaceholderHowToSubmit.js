import React from "react"

import ArticleSection from "../../Article/components/ArticleSection"
import ArticleWrapper from "../../Article/components/ArticleWrapper"
import HowToSubmit from "../../../../../user/components/pages/Submit/components/HowToSubmit"
import LinkButton from "../../../controls/Button/components/LinkButton"

export default () => {
  return (
    <ArticleWrapper>
      <ArticleSection plain>
        <HowToSubmit />
        <LinkButton to={"/submit/compose"} branded>
          Submit Now
        </LinkButton>
      </ArticleSection>
    </ArticleWrapper>
  )
}
