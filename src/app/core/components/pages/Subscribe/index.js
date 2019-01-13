import React from "react"
import styled from "styled-components"

import { CardCaptionIntegrated } from "../../controls/ArticleActions/components/Options"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import ButtonGroup from "../../controls/Button/components/ButtonGroup"
import CardHeader from "../../controls/Card/components/CardHeader"
import CardIntegrated from "../../controls/Card/components/CardIntegrated"
import HeaderLarge from "../../vignettes/HeaderLarge"
import Link from "../../controls/Link"
import MetaTags from "../../vignettes/MetaTags"
import Subscribe from "../../../../user/components/forms/Subscribe"

const metaTitle = "Analogue Reads"
const metaDescription =
  "Photo essays, reviews, guides. Weekly email newsletter, delivered Tuesdays at 9AM EST."

const WallPaper = styled.div`
  margin-top: 1em;
  ${props => props.theme.size.breakpoint.max.m`
    margin-top: 0;
  `} height: 100vh;
  min-height: 670px;
  padding-top: 3em;
  background: url(${"https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_1268/image-froth_1512027_B13cpBr2m.jpg"});
  background-size: cover;
  background-position: top center;
`

export const GetYourWeekly = () => (
  <CardCaptionIntegrated>
    Photo essays, reviews, guides. Delivered Tuesdays at 9AM EST.
    <br />
    Free. <Link to="/privacy-policy">No spam</Link>.{" "}
    <Link to="https://us4.campaign-archive.com/?u=256339f7eafa36f2f466aca44&id=f8892b3a23">
      Sneak Peek
    </Link>
    .
  </CardCaptionIntegrated>
)

export default props => {
  return (
    <ArticleWrapper style={{ overflow: "visible" }}>
      <MetaTags metaTitle={metaTitle} metaDescription={metaDescription} />
      <HeaderLarge pageTitle={metaTitle} pageSubtitle="Every Tuesday Morning" />

      <WallPaper>
        <ArticleSection>
          <ButtonGroup>
            <CardIntegrated>
              <CardHeader
                stubborn
                buttons={[0]}
                noStar
                title="Weekly Email Newsletter"
              />
              <GetYourWeekly />
              <Subscribe
                autoFocus
                stateOverwrite={{ subscribeForm: true }}
                formLocation={"Subscribe"}
              />
            </CardIntegrated>
            {/* <FollowButtons /> */}
          </ButtonGroup>
        </ArticleSection>
      </WallPaper>
    </ArticleWrapper>
  )
}
