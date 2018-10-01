import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"

import { makeFroth } from "../../../../utils"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup"
import ContactInfo from "../../../../core/components/vignettes/ContactInfo"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import HowToSubmit from "./components/HowToSubmit"
import Link from "../../../../core/components/controls/Link"
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton"
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import Modal from "../../../../core/components/controls/Modal"
import RemoteMessage from "../../../../core/components/vignettes/RemoteMessage"

export const ctaTextInit = () =>
  loadTextContent().length > 0 ? "Continue With Submission" : "Submit Now"

export const SubmitIntro = () => {
  const ctaText = ctaTextInit()
  return (
    <span>
      <strong>Get your work reviewed and published</strong> along with a growing{" "}
      <Link to="/about">community</Link> of authors, artists, film
      photographers. Each accepted submission is{" "}
      <Modal
        with={{
          info: {
            title: "Editor’s Note",
            text: (
              <span>
                We tend to edit every article for clarity of expression,
                grammar, and style. At times this yields a lot of changes.{" "}
                <strong>
                  We do our best to preserve every author’s original voice and
                  message while taking the language onto the next level.
                </strong>
                <br />
                <br />
                However, if you’d like to have greater control over content,
                just let us know and we’ll send the edited version to you for
                approval before publishing: <ContactInfo />
              </span>
            ),
            buttons: [
              {
                to: "/submit/compose",
                text: ctaText,
                branded: true
              }
            ]
          },
          id: "hints/submission-edits"
        }}
      >
        edited
      </Modal>{" "}
      to look and read beautifully – for thousands of global readers.
    </span>
  )
}

export default () => {
  const ctaText = ctaTextInit()
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
        <p>
          Do you shoot film? <SubmitIntro />
        </p>

        <ButtonGroup style={{ paddingBottom: "1.5em" }}>
          <LinkButton to={"/submit/compose"} branded>
            {ctaText}
          </LinkButton>
          <p>
            <Link to="/sign-in">
              <strong>Sign in</strong>
            </Link>{" "}
            if you have an account.
          </p>
        </ButtonGroup>

        <p>
          <strong>Sending submissions is easy.</strong> Plus, you get to see
          what your work may look like when published with the{" "}
          <Link to="/submit/compose">
            <em>Composer</em>
          </Link>{" "}
          tool. Just add your images, title, text, and click “Send” once ready.
        </p>

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
