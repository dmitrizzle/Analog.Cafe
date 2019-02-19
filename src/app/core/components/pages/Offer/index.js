import React from "react"
import styled from "styled-components"

import { CardCaptionIntegrated } from "../../controls/ArticleActions/components/Options"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import ButtonGroup from "../../controls/Button/components/ButtonGroup"
import CardHeader from "../../controls/Card/components/CardHeader"
import CardIntegrated from "../../controls/Card/components/CardIntegrated"
import Link from "../../controls/Link"
import Subscribe from "../../../../user/components/forms/Subscribe"

export const GetYourWeekly = () => (
  <CardCaptionIntegrated>
    New photo essays, reviews, and guides every Tuesday at 9AM EST.{" "}
    <Link to="/privacy-policy">No spam</Link>.
    {/* {" "}
    <Link to="https://us4.campaign-archive.com/?u=256339f7eafa36f2f466aca44&id=f8892b3a23">
      Sneak Peek
    </Link>
    . */}
  </CardCaptionIntegrated>
)

const SubscribeWrapper = styled(ArticleWrapper)`
  overflow: visible;
  padding-top: ${props => (props.embed ? "6em" : undefined)};
  @media print {
    display: none;
  }
`

export default props => {
  return (
    <SubscribeWrapper>
      {/* {!props.embed && (
        <React.Fragment>
          <MetaTags metaTitle={metaTitle} metaDescription={metaDescription} />
          <HeaderLarge
            pageTitle={metaTitle}
            pageSubtitle="Every Tuesday Morning"
          />
        </React.Fragment>
      )}
      {props.embed && (
        <HeaderLarge
          pageTitle={metaTitle}
          pageSubtitle="Every Tuesday Morning"
          style={{ textSshadow: "0 0 5em rgba(255, 255, 255, 0.64)" }}
        />
      )} */}
      <ArticleSection>
        <ButtonGroup>
          <CardIntegrated>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title="💌 Weekly Email Newsletter"
            />
            <GetYourWeekly />
            <Subscribe
              autoFocus={!props.embed}
              stateOverwrite={{ subscribeForm: true }}
              formLocation={"Subscribe"}
            />
          </CardIntegrated>
          {/* <FollowButtons /> */}
        </ButtonGroup>
      </ArticleSection>
    </SubscribeWrapper>
  )
}
