// tools
import React from "react"
import styled from "styled-components"
import Helmet from "../_async/Helmet"

// components
import Heading from "../ArticleHeading"
import Figure from "../Picture"
import Link from "../Link"
import { ModalDispatch } from "../../containers/Modal"
import Email from "../Email"
import MailChimpPrefill from "../../containers/_forms/MailChimpPrefill"
import ArticleActions from "../Card/components/ArticleActions"
import { SubscribeToWeekly } from "../_rt-snippets"

import { froth } from "../../../utils/image-froth"

// styles
import { Section, Article, Quote } from "../ArticleStyles"

const ThankYouList = styled(Quote)`
  font-style: normal !important;
  &::first-letter {
    font-size: inherit !important;
    font-weight: inherit !important;
    float: none !important;
    margin: 0 !important;
  }
  &::before,
  &::after {
    content: "" !important;
  }
`
const metaTitle = "About"
const metaDescription =
  "Story, reason for existence, contributos and resources."

// render
export default props => {
  return (
    <Article>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta
          property="og:image"
          content={
            froth({
              src: "image-froth_669120_c34babc2fb974c8d9f03249bea647401",
              size: "m"
            }).src
          }
        />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>
      <Heading
        pageTitle="Analog.Cafe"
        pageSubtitle="A Film Photography Publication"
      />
      <Section>
        <Figure
          src="image-froth_669120_c34babc2fb974c8d9f03249bea647401"
          feature
          noAuthor
          alt="Forest view"
        >
          A short ride up a twisty mountain road from downtown Chiang Mai<br />&mdash;
          where Analog.Cafe is built &mdash;<br />is a tropical forest.
        </Figure>
        <blockquote>
          <strong>Analog.Cafe</strong> exists because of the people who
          contribute their art and the editors who curate it. It’s because of
          the{" "}
          <Link to="https://github.com/dmitrizzle/Analog.Cafe/wiki/Contributors">
            developers
          </Link>{" "}
          and designers who devote their time and skill to build this platform.
          And because of the 51 people who have graciously{" "}
          <Link to="https://www.kickstarter.com/projects/dmitrizzle/analogcafe-the-remarkable-film-photography-blog">
            funded
          </Link>{" "}
          the initial stages of this project.
        </blockquote>
        <p>
          Analog.Cafe is an{" "}
          <ModalDispatch
            with={{
              info: {
                title: "Inclusive",
                text:
                  "Analog.Cafe is a human-edited publication; it’s bound to be shaped by personal opinions. However, it shall always strive to be welcoming and fair."
              },
              id: "footnotes/analog-cafe-inclusive"
            }}
          >
            inclusive
          </ModalDispatch>{" "}
          creative outlet that publishes{" "}
          <strong>outstanding images and stories</strong>.
        </p>
        <p>
          Analog.Cafe’s editors favour works based on{" "}
          <strong>skill, imagination, innovation and diversity</strong>.
        </p>

        <hr />

        <h3>Thank you, Kickstarter backers!</h3>
        <p>
          Analog.Cafe owes its existence in large part to the contributions,
          support and encouragement provided by the people below.
        </p>

        <ThankYouList>
          Thayanantha Thevanayagam<br />
          Betty Dai<br />
          Kevin Kethcart<br />
          Fernando Lavin (@film.lav)<br />
          Lee Webb<br />
          Lewis Phan<br />
          Genester<br />
          Jose Altamirano (josekasek)<br />
          Marianne Oliver<br />
          Michael Jones<br />
          Tim Dobbs<br />
          James Cockroft<br />
          faultyflipflap<br />
          Jennifer Precious Finch<br />
          Denise<br />
          Frank Russo<br />
          Domenico Stefani<br />
          Stephen King<br />
          Arjun Mohan<br />
          Kevin Aungle<br />
          Jack Yu<br />
          Stephen Dowling<br />
          Anonymous<br />
          Joey Pasco<br />
          Kanoa Mulling<br />
          BVH<br />
          Jacob Michael Hanania<br />
          Rob James Davie<br />
          Joey Santiago<br />
          Danielle Cardoz<br />
          Francisco M<br />
          Jonathan Zobro<br />
          Matthew Stollmeyer<br />
          Ishtiaq Rahman<br />
          Lu Yu<br />
          Jan Ian Chow<br />
          Olga Tcherbadji<br />
          Andreea Cojocaru<br />
          Jeff Santos<br />
          Arjan Wiertz<br />
          Stepan Cherbadzhi<br />
          Jackie Wong<br />
          Vivian Qiu<br />
          Ben Yee<br />
          Ashley Taylor<br />
          Anonymous<br />
          Anonymous<br />
          Geraldine Pontius<br />
          Larry Treadway<br />
          Hakan (@haknization)<br />
          Ben Cairns
        </ThankYouList>

        <h3>Connect, contact & get involved.</h3>
        <p>
          <SubscribeToWeekly />
        </p>
        <MailChimpPrefill buttonText="Subscribe ❤︎" />

        <ArticleActions mode="follow" />
        <p>
          If you have a question, suggestion or just want to chat, feel free to
          follow, message, or email <Email />
        </p>
      </Section>
    </Article>
  )
}
