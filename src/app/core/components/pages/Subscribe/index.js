import React from "react"
import styled from "styled-components"

import { CardCaptionIntegrated } from "../../controls/ArticleActions/components/Options"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import ButtonGroup from "../../controls/Button/components/ButtonGroup"
import CardHeader from "../../controls/Card/components/CardHeader"
import CardIntegrated from "../../controls/Card/components/CardIntegrated"
import FollowButtons from "../../controls/ArticleActions/components/FollowButtons"
import HeaderLarge from "../../vignettes/HeaderLarge"
import Link from "../../controls/Link"
import MetaTags from "../../vignettes/MetaTags"
import Subscribe from "../../../../user/components/forms/Subscribe"

const metaTitle = "Subscribe"
const metaDescription = ""

const WallPaper = styled.div`
  margin-top: 1em;
  ${props => props.theme.size.breakpoint.max.m`
    margin-top: 0;
  `} height: 100vh;
  padding-top: 3em;
  background: url(${"https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_1268/image-froth_1512027_B13cpBr2m.jpg"});
  background-size: cover;
  background-position: top center;
`

export const GetYourWeekly = () => (
  <CardCaptionIntegrated>
    Get your weekly dose of stories, reviews, and guides on art and film
    photography. <Link to="/privacy-policy">No spam</Link>.
  </CardCaptionIntegrated>
)

export default props => {
  return (
    <ArticleWrapper>
      <MetaTags metaTitle={metaTitle} metaDescription={metaDescription} />
      <HeaderLarge pageTitle={metaTitle} pageSubtitle="Analog.Cafe" />

      <WallPaper>
        <ArticleSection>
          <ButtonGroup>
            <CardIntegrated>
              <CardHeader
                stubborn
                buttons={[0]}
                noStar
                title="Email Newsletter"
              />
              <GetYourWeekly />
              <Subscribe
                autoFocus={false}
                stateOverwrite={{ subscribeForm: true }}
                formLocation={"Subscribe"}
              />
            </CardIntegrated>
            <FollowButtons />
          </ButtonGroup>
        </ArticleSection>
      </WallPaper>
    </ArticleWrapper>
  )
}
