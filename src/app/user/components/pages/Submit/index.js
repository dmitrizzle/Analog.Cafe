import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"

import { makeFroth } from "../../../../utils"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import HowToSubmit from "./components/HowToSubmit"
import Link from "../../../../core/components/controls/Link"
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton"
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import RemoteMessage from "../../../../core/components/vignettes/RemoteMessage"

export const ctaTextInit = () =>
  loadTextContent().length > 0 ? "Continue With Submission" : "Submit Now"

export const SubmitIntro = () => {
  return (
    <span>
      Get your work published along with a growing{" "}
      <Link to="/about">community</Link> of artists and film photographers.
    </span>
  )
}

export default () => {
  return (
    <ArticleWrapper>
      <MetaTags
        metaTitle="Get Published"
        metaDescription="Submit film photography essays, stories, guides, and reviews to be featured on Analog.Cafe."
        metaImage={
          makeFroth({
            src: "image-froth_1533636_rygH__d9kQ",
            size: "m"
          }).src
        }
      />
      <HeaderLarge
        pageTitle="Get Published"
        pageSubtitle="Write for Analog.Cafe"
      />
      <ArticleSection>
        <p>
          <strong>Do you shoot film?</strong> <SubmitIntro />
        </p>

        <ButtonGroup style={{ paddingBottom: "1.5em" }}>
          <LinkButton to={"/submit/compose"} branded>
            {ctaTextInit()}
          </LinkButton>
          <p>
            <Link to="/sign-in">
              <strong>Sign in</strong>
            </Link>{" "}
            if you have an account.
          </p>
        </ButtonGroup>

        <p>
          <strong>Get £5 for film.</strong> As a small token of appreciation for
          your time, skill and talent, accepted submissions will receive an
          exclusive coupon for £5 from{" "}
          <Link to="https://analoguewonderland.co.uk/">
            Analogue Wonderland
          </Link>
          . There are <RemoteMessage from="promotions" id="coupons-left" /> left
          to give.
        </p>

        <HowToSubmit />
      </ArticleSection>
    </ArticleWrapper>
  )
}
