import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
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
const getPublished = "Get your work published on Analog.Cafe"

export default props => {
  const Body = () => (
    <ArticleSection>
      <Modal
        unmarked
        element="a"
        with={{
          info: {
            image: "image-froth_1499794_SyjYGWYL4",
            title: "Call for entries.",
            text: posterText,
            buttons: [
              {
                to:
                  "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_1800/image-froth_1499794_SyjYGWYL4.jpg",
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
        <Figure src="image-froth_1499794_SyjYGWYL4" feature alt={posterText} />
      </Modal>
      <p>
        If you love shooting film and have a story to share, Analog.Cafe could
        be <em>the</em> place to publish it.
      </p>
      <p>
        We feature fun, beautiful, creative, educational, and entertaining
        pieces written by casual and regular contributors. Every new article is
        an event which we celebrate on our Twitter, Instagram, and weekly email
        newsletter. As well as <strong>the front page</strong> 👏👏👏
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

      <Figure
        style={{ cursor: "default" }}
        src="image-froth_1963351_HJUmY88I4"
      />

      <p>
        Best way to get accepted is to read a few articles on the website to get
        a better sense for what gets published. For further advice and ideas,
        read{" "}
        <Link to="/zine/open-call-g99w">
          <strong>this</strong>
        </Link>
        .
      </p>
      <h3>Good luck!</h3>
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
      <HeaderLarge pageTitle="Get Featured" pageSubtitle={getPublished} />
      <Body />
    </ArticleWrapper>
  ) : (
    <Body />
  )
}
