import React from "react"

import { TEXT_EDITORIAL_RELEASE } from "../../../constants/messages-submission"
import { makeFroth } from "../../../../utils"
import { smartGreeting } from "../../../../core/utils/messages-"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup"
import Figure from "../../../../core/components/vignettes/Picture/components/Figure"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import HowToSubmit from "./components/HowToSubmit"
import Link from "../../../../core/components/controls/Link"
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton"
import MetaTags from "../../../../core/components/vignettes/MetaTags"

export default () => {
  return (
    <ArticleWrapper>
      <MetaTags
        metaTitle="Submit"
        metaDescription="Submit film photography essays and articles to be featured on Analog.Cafe."
        metaImage={
          makeFroth({
            src: "image-froth_1533636_rygH__d9kQ",
            size: "m"
          }).src
        }
      />
      <HeaderLarge pageTitle="Submit" />
      <ArticleSection>
        <div style={{ textAlign: "center" }}>
          <LinkButton to={"/submit/compose"} branded>
            Submit Now
          </LinkButton>
          <p>
            <em>- or -</em>
          </p>
          <p>
            <Link to="/sign-in">
              <strong>Sign in</strong>
            </Link>{" "}
            if you have an account.
          </p>
        </div>
        <Figure src="image-froth_1061008_rJ_ULUmd7" feature nocaption />
        <p>
          This autumn, all qualifying submissions will receive an exclusive
          coupon for £5 from{" "}
          <Link to="https://analoguewonderland.co.uk/">
            Analogue Wonderland
          </Link>
          ’s incredible selection of over 180 film stocks!
        </p>
        <p>
          <strong>To get the deal</strong>, follow the steps below to create and
          send your submission. Provided that your content and images look good,
          an editor will reach out to you with a coupon code that you can use at
          Analogue Wonderland.
        </p>
        <p>
          <strong>There is a limited number of coupons available.</strong>
        </p>
        <h3>What to submit.</h3>
        <p>
          Analog.Cafe’s speciality is{" "}
          <Link to="/photo-essays">
            <strong>photo essays</strong>
          </Link>
          , composed with images shot on{" "}
          <Link to="/zine/analogue-photography-98f3">film cameras</Link>.
          However, any illustrated, written piece is considered, as long as it
          fits with the publication. Including: guides, reviews, and stories.
        </p>

        <HowToSubmit />

        <h3>Please note.</h3>
        <p>{TEXT_EDITORIAL_RELEASE}</p>
        <p>
          There are more detailed <Link to="/submit/rules">rules</Link> that
          Analog.Cafe uses to govern its relationship with you and others.
          Privacy policy is <Link to="/privacy-policy">here</Link>.
        </p>

        <ButtonGroup>
          <LinkButton to={"/submit/compose"} branded>
            Submit Now
          </LinkButton>
          <p>
            <em>- or -</em>
          </p>
          <p>
            <Link to="/sign-in">
              <strong>Sign in</strong>
            </Link>{" "}
            if you already have an account.
          </p>
        </ButtonGroup>
      </ArticleSection>
    </ArticleWrapper>
  )
}
