import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/storage"
import React from "react"

import { CARD_ALERTS } from "../../../constants/messages-submission"
import { makeFroth } from "../../../../utils"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup"
import Figure from "../../../../core/components/vignettes/Picture/components/Figure"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../core/components/controls/Link"
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton"
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import Modal from "../../../../core/components/controls/Modal"

export const ctaTextInit = () =>
  loadTextContent().length > 0 ? "Continue With Submission" : "Submit Now"

const posterText =
  "Photos shot on film, 200+ words, your topic. No fees, no deadlines, easy submissions, free editorial reviews."
const getPublished = "Photo essays, articles, reviews"

export default props => {
  const Body = () => (
    <ArticleSection>
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

      <Modal
        unmarked
        element="a"
        with={{
          info: {
            image: "image-froth_1499794_BkFUA89IV",
            title: "Call for entries.",
            text: posterText,
            buttons: [
              {
                to:
                  "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_1800/image-froth_1499794_BkFUA89IV.jpg",
                text: "Download This Poster"
              },
              {
                to: "/submit/compose",
                text: "Submit Your Work",
                branded: true
              }
            ]
          },
          id: "hints/submissions"
        }}
      >
        <Figure src="image-froth_1499794_BkFUA89IV" feature alt={posterText} />
      </Modal>
      <p>
        If you love shooting film and have a story to share, Analog.Cafe could
        be a good place for it.
      </p>
      <p>
        <Link to="/about">We</Link> feature fun, beautiful, creative,
        educational, and entertaining pieces written by casual and regular
        contributors. We celebrate every new contribution on{" "}
        <Link to="https://twitter.com/analog_cafe">social</Link>{" "}
        <Link to="https://instagram.com/analog_cafe">media</Link>, weekly email{" "}
        <Modal
          element="a"
          with={{
            info: {
              image: "image-froth_1600000_BJRvHFlv4",
              title: "“Analogue Reads” Emails",
              text:
                "A weekly email newsletter, delivered every Tuesday to all Analog.Cafe members. No spam."
            },
            id: "hints/emails"
          }}
        >
          newsletter
        </Modal>
        , and the front <Link to="/">page</Link>.
      </p>
      <p>
        It’s easy to send your submission with the handy{" "}
        <em>
          <Modal
            element="a"
            with={{
              info: {
                image:
                  "https://res.cloudinary.com/analog-cafe/image/upload/v1528904759/image-froth_1010453_425a5704760c4879b31e008315c3047c.gif",
                title: "Analog.Cafe Composer",
                buttons: [
                  {
                    to: "/submit/compose",
                    text: "Try It"
                  }
                ]
              },
              id: "hints/composer"
            }}
          >
            Composer
          </Modal>
        </em>{" "}
        tool. It{" "}
        <Modal element="a" with={CARD_ALERTS.AUTO_SAVE}>
          saves
        </Modal>{" "}
        your work and makes uploading images easy.
      </p>
      <p>
        All accepted submissions are edited for grammar and style to read well
        for years to come. We pride ourselves in the ability to bring out the
        best in even the least experienced writers.
      </p>

      <p>
        There are no technical limitations to your submission other than 10MB or
        smaller JPG images. You retain <Link to="/submit/rules">all</Link> of
        the rights and ownership to the photographs and the text you submit.
      </p>
      <h3>How to get published.</h3>
      <Figure
        style={{ cursor: "default" }}
        src="image-froth_1963351_HJUmY88I4"
      />

      <p>
        Best way to get your work selected for publication is to read a few
        articles on the website. This should help you get a better sense for
        content and style.
      </p>
      <p>
        For further advice and ideas, read{" "}
        <strong>
          <Link to="/zine/open-call-g99w">this guide</Link>
        </strong>
        .
      </p>
      <div style={{ clear: "both" }} />

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
    </ArticleSection>
  )
  return !props.embed ? (
    <ArticleWrapper>
      <MetaTags
        metaTitle={getPublished}
        metaDescription={posterText}
        metaImage={
          makeFroth({
            src: "image-froth_1533636_rygH__d9kQ",
            size: "m"
          }).src
        }
      />
      <HeaderLarge pageTitle="Submit" pageSubtitle={getPublished} />
      <Body />
    </ArticleWrapper>
  ) : (
    <Body />
  )
}
