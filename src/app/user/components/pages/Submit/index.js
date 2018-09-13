import React from "react"

import { TEXT_EDITORIAL_RELEASE } from "../../../constants/messages-submission"
import { makeFroth } from "../../../../utils"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup"
import Figure from "../../../../core/components/vignettes/Picture/components/Figure"
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
        pageTitle="Submit Yours"
        pageSubtitle="Photo Essays, Stories, Guides, Reviews"
      />
      <ArticleSection>
        <div style={{ textAlign: "center" }}>
          <p>
            <em>We’ll take care of the grammar.</em>
          </p>
          <LinkButton to={"/submit/compose"} branded>
            Submit Now
          </LinkButton>
        </div>

        <HowToSubmit />

        <h3>What to submit.</h3>
        <p>
          Analog.Cafe’s speciality is{" "}
          <Link to="/photo-essays">
            <strong>photo essays</strong>
          </Link>
          , composed with images shot on{" "}
          <Link to="/zine/analogue-photography-98f3">film cameras</Link>.
        </p>

        <p>
          All written pieces are considered, as long as they fit well within the
          rest of the articles here. If you haven’t yet,{" "}
          <Link to="/">give them a read</Link>!
        </p>

        <div style={{ textAlign: "center" }}>
          <p>
            <em>We have a film perk for you.</em>
          </p>
          <LinkButton to={"/submit/compose"} branded>
            Submit Now
          </LinkButton>
        </div>

        <h3>A thank-you offer.</h3>
        <Figure src="image-froth_737735_BJVOSKw_7" nocaption />
        <p>
          As a small token of appreciation for the time, skill and talent that
          goes into composing submissions, all{" "}
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
          entries will receive an exclusive coupon for £5 from{" "}
          <Link to="https://analoguewonderland.co.uk/">
            Analogue Wonderland
          </Link>
          ’s incredible selection of over 180 film stocks.
        </p>
        <p>
          We’ll email you the code after we’ve reviewed and approved your
          submission.{" "}
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

        <h3>Rules.</h3>
        <p>{TEXT_EDITORIAL_RELEASE}</p>
        <p>
          Complete set of rules should be read{" "}
          <Link to="/submit/rules">here</Link>.
        </p>

        <ButtonGroup>
          <p>
            <em>Non-exclusive, reprint is OK.</em>
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
            if you already have an account.
          </p>
        </ButtonGroup>
      </ArticleSection>
    </ArticleWrapper>
  )
}
