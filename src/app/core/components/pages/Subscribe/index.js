import React from "react"
import styled from "styled-components"

import { CardCaptionIntegrated } from "../../controls/ArticleActions/components/Options"
import { makeFroth } from "../../../../utils"
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

const bgList = [
  "image-froth_1480456_Hk9sPRsQV",
  "image-froth_1469613_Skk4VZmZE",
  "image-froth_1518843_B1skGpWWV",
  "image-froth_1508069_r1vQk9iJN",
  "image-froth_1206996_r1CqlUwRm",
  "image-froth_1491916_rk1gPcNtm",
  "image-froth_1557196_SJmddu5y7",
  "image-froth_1500270_ryAMqwpRz"
]
const bgRoulette = () => bgList[Math.floor(Math.random() * bgList.length)]
const bgRouletteCached = bgList[Math.floor(Math.random() * bgList.length)]

export const WallPaper = styled.div`
  border-top: ${props => props.theme.elements.thickBorder};
  margin-top: 1em;
  height: 100vh;
  min-height: 670px;
  padding-top: 3em;
  background: url(${props =>
    makeFroth({
      src: props.bgRouletteCached,
      size: "l"
    }).src});
  background-size: cover;
  background-position: top center;
  ${props => props.theme.size.breakpoint.max.m`
    margin-top: 0;
    background-image: url(${props =>
      makeFroth({
        src: props.bgRouletteCached,
        size: "m"
      }).src});
  `};
`

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

export const SubscribeWrapper = styled(ArticleWrapper)`
  overflow: visible;
  padding-top: ${props => (props.embed ? "6em" : undefined)};
  @media print {
    display: none;
  }
`

export default props => {
  return (
    <SubscribeWrapper>
      {!props.embed && (
        <React.Fragment>
          <MetaTags metaTitle={metaTitle} metaDescription={metaDescription} />
          <HeaderLarge
            pageTitle={metaTitle}
            pageSubtitle="Every Tuesday Morning"
          />
        </React.Fragment>
      )}

      <WallPaper
        bgRouletteCached={bgRouletteCached}
        bgRoulette={!props.cached && bgRoulette}
      >
        {props.embed && (
          <HeaderLarge
            pageTitle={metaTitle}
            pageSubtitle="Every Tuesday Morning"
            style={{ textSshadow: "0 0 5em rgba(255, 255, 255, 0.64)" }}
          />
        )}
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
      </WallPaper>
    </SubscribeWrapper>
  )
}
