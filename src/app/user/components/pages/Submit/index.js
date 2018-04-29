import React from "react"

import { makeFroth } from "../../../../utils"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup"
import Figure from "../../../../core/components/vignettes/Picture/components/Figure"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import HowToGetAccepted from "./components/HowToGetAccepted"
import HowToSubmit from "./components/HowToSubmit"
import Link from "../../../../core/components/controls/Link"
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton"
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import Rules from "./components/Rules"

export default () => {
  return (
    <ArticleWrapper>
      <MetaTags
        metaTitle="Submit"
        metaDescription="Submit film photography essays and articles to be featured on Analog.Cafe."
        metaImage={
          makeFroth({
            src: "image-froth_1546790_b5ff5d48edf8488387d39f64e18b2916",
            size: "m"
          }).src
        }
      />
      <HeaderLarge
        pageTitle="Submit"
        pageSubtitle="Film Photography, Essays & Articles"
      />
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
        <Figure
          src="image-froth_1546790_b5ff5d48edf8488387d39f64e18b2916"
          feature
          nocaption
        />
        <HowToSubmit />
        <HowToGetAccepted />
        <Rules />
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
