import React from "react"

import {
  SubmitIntro,
  ctaTextInit
} from "../../../../../user/components/pages/Submit"
import ArticleSection from "../../Article/components/ArticleSection"
import ArticleWrapper from "../../Article/components/ArticleWrapper"
import ButtonGroup from "../../../controls/Button/components/ButtonGroup"
import HowToSubmit from "../../../../../user/components/pages/Submit/components/HowToSubmit"
import LinkButton from "../../../controls/Button/components/LinkButton"

export default () => {
  const ctaText = ctaTextInit()

  return (
    <ArticleSection style={{ paddingBottom: "17.5em" }}>
      <hr />
      <SubmitIntro />
      <ButtonGroup style={{ paddingBottom: "1.5em" }}>
        <LinkButton to={"/submit/compose"} branded>
          {ctaText}
        </LinkButton>
      </ButtonGroup>

      <HowToSubmit />
    </ArticleSection>
  )
}
