import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"

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
            image: "image-froth_1499794_Sy-vi6yLE",
            title: "Call for entries.",
            text: posterText,
            buttons: [
              {
                to: "/submit/compose",
                text: "Submit Now",
                branded: true
              }
            ]
          },
          id: "modal/hints/submissions"
        }}
      >
        <Figure src="image-froth_1499794_Sy-vi6yLE" feature alt={posterText} />
      </Modal>
      <p>
        If you love shooting film and have a story to share, Analog.Cafe could
        be your perfect platform!
      </p>
      <p>
        We publish fun, beautiful, creative, educational, and entertaining
        pieces written by casual and regular contributors. Every new article is
        an event that we celebrate on our Twitter, Instagram, and email channels
        and feature prominently on <strong>the front page</strong>. 👏
      </p>
      <p>
        It’s very easy to send your submission with the{" "}
        <em>
          <Link to="/submit/compose">Composer</Link>
        </em>{" "}
        tool. Composer saves your work as you type and formats your images
        automatically.
      </p>
      <p>
        All accepted submissions are edited for grammar and style to read well
        for years to come. We pride ourselves in the ability to bring out the
        best in even the least experienced writers.
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
        Best way to get accepted is to read a few articles on the website. For
        ideas on what to write about read{" "}
        <Link to="/zine/open-call-g99w">this</Link>.
      </p>
      <p>
        There are no technical limitations to your submission other than 10MB,
        or smaller, JPG images. You retain <Link to="/submit/rules">all</Link>{" "}
        of the rights and ownership to the photographs and the text you submit.
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
