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
import Modal from "../../../../core/components/controls/Modal"
import RemoteMessage from "../../../../core/components/vignettes/RemoteMessage"

export default () => {
  return (
    <ArticleWrapper>
      <MetaTags
        metaTitle="Submit"
        metaDescription="Submit film photography essays, stories, guides, and reviews to be featured on Analog.Cafe."
        metaImage={
          makeFroth({
            src: "image-froth_1533636_rygH__d9kQ",
            size: "m"
          }).src
        }
      />
      <HeaderLarge
        pageTitle="Submit"
        pageSubtitle="Photo Essays, Stories, Guides, Reviews"
      />
      <ArticleSection>
        <h3>Get £5 for film.</h3>
        <p>
          As a small token of appreciation for your time, skill and talent,{" "}
          <Modal
            with={{
              info: {
                title: "What Qualifies?",
                text: (
                  <span>
                    Submissions with compelling stories or informative guides,
                    with quality images, shot on film. Best way to tell what’s
                    acceptable is to <Link to="/">browse</Link> Analog.Cafe
                    content.
                    <br />
                    <br />
                    Remarkably, the current acceptance rate on Analog.Cafe is
                    85% – so your chances are looking good.
                  </span>
                ),
                buttons: [
                  {
                    to: "/submit/compose",
                    text: "Submit Now",
                    branded: true
                  }
                ]
              },
              id: "hints/qualifying-submission"
            }}
          >
            qualifying
          </Modal>{" "}
          submissions will receive an exclusive coupon for £5 from{" "}
          <Link to="https://analoguewonderland.co.uk/">
            Analogue Wonderland
          </Link>
          ’s incredible selection of over 180 film stocks.
        </p>
        <p>
          <strong>
            There’s a{" "}
            <Modal
              with={{
                info: {
                  title: "How Many Coupons Left?",
                  text: (
                    <span>
                      There are only{" "}
                      <strong>
                        <RemoteMessage from="promotions" id="coupons-left" />{" "}
                        coupons left
                      </strong>
                      !
                    </span>
                  ),
                  image: "image-froth_1511062_ByvHiFXdX",
                  buttons: [
                    {
                      to: "/submit/compose",
                      text: "Submit Now",
                      branded: true
                    }
                  ]
                },
                id: "hints/how-many-coupons-left"
              }}
            >
              limited number
            </Modal>{" "}
            of coupons available.
          </strong>
        </p>
        <div style={{ textAlign: "center" }}>
          <LinkButton to={"/submit/compose"} branded>
            Submit Now
          </LinkButton>
        </div>

        <hr />
        <HowToSubmit />

        <ButtonGroup>
          <p>
            <em>We’ll take care of the grammar.</em>
          </p>
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
        </ButtonGroup>
      </ArticleSection>
    </ArticleWrapper>
  )
}
