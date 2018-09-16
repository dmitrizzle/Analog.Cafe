import { connect } from "react-redux"
import React from "react"

import { CARD_ALERTS } from "../../../../user/constants/messages-submission"
import { GA } from "../../../../utils"
import { ROUTE_API_AUTHORS } from "../../../constants/routes-article"
import { TEXT_LABELS } from "../../../constants/messages-"
import { smartGreeting } from "../../../utils/messages-"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import ButtonGroup from "../../controls/Button/components/ButtonGroup"
import Byline from "../../vignettes/Byline"
import CardIntegrated from "../../controls/Card/components/CardIntegrated"
import ContactInfo from "../../vignettes/ContactInfo"
import Figure from "../../vignettes/Picture/components/Figure"
import FollowButtons from "../../controls/ArticleActions/components/FollowButtons"
import HeaderLarge from "../../vignettes/HeaderLarge"
import Link from "../../controls/Link"
import LinkButton from "../../controls/Button/components/LinkButton"
import MailChimpPrefill from "../../../../user/components/forms/Subscribe/components/MailChimpPrefill"
import MetaTags from "../../vignettes/MetaTags"
import Modal from "../../controls/Modal"
import ThankYouList from "./components/ThankYouList"

const metaTitle = "About"
const metaDescription =
  "Analog.Cafe is a magazine that promotes creative and informative works by a community of writers, artists and film photographers."

const About = props => {
  return (
    <ArticleWrapper>
      <MetaTags metaTitle={metaTitle} metaDescription={metaDescription} />
      <HeaderLarge
        pageTitle="Analog.Cafe"
        pageSubtitle="A Film Photography Magazine"
      />
      <ArticleSection>
        <Figure
          src="image-froth_1533636_rygH__d9kQ"
          feature
          alt="A photograph of a misty forest"
        />
        <h3>{smartGreeting()}</h3>
        <p>
          Analog.Cafe is a magazine that promotes creative and informative works
          by a community of writers, artists and film photographers.
        </p>

        <p>
          Every week we publish quality{" "}
          <Link to="/photo-essays">photo essays</Link>,{" "}
          <Link to="/guides">guides</Link>, <Link to="/reviews">reviews</Link>,
          and <Link to="/stories">stories</Link>. Some of which are{" "}
          <Link to="/solo-projects">solo projects</Link>, while others are{" "}
          <Link to="/collaborations">collaborations</Link>.
        </p>
        <p>
          Together, we are building a place to discover beauty, get inspired,
          and learn something new. <strong>Join us:</strong>
        </p>
        <ButtonGroup>
          <LinkButton
            branded
            to={props.userStatus === "ok" ? "/submit/compose" : "/submit"}
            onClick={() => {
              GA.event({
                category: "Campaign",
                action: "About.submit_button"
              })
            }}
          >
            Submit Your Article
          </LinkButton>
        </ButtonGroup>
        <h3>The Editors.</h3>
        <p>
          <Modal
            with={{
              request: {
                url: ROUTE_API_AUTHORS + "/betty"
              }
            }}
          >
            Betty
          </Modal>{" "}
          and{" "}
          <Modal
            with={{
              request: {
                url: ROUTE_API_AUTHORS + "/dmitrizzle"
              }
            }}
          >
            Dmitri
          </Modal>{" "}
          edit every article, keeping the content interesting, thoughtful, and
          readable.
        </p>

        <h3>The App.</h3>
        <p>
          Analog.Cafe is built in-house and maintained specifically for{" "}
          <Link to="/zine/analogue-photography-98f3">analogue</Link>{" "}
          enthusiasts. It respects <Link to="/privacy-policy">privacy</Link>,
          works{" "}
          <Modal
            with={{
              ...CARD_ALERTS.AUTO_SAVE,
              info: {
                ...CARD_ALERTS.AUTO_SAVE.info,
                title: "Create Submissions Offline",
                buttons: [
                  {
                    to: "/submit/compose",
                    text: "Submit Now",
                    branded: true
                  }
                ]
              }
            }}
          >
            offline
          </Modal>
          , comes with many <Link to="/zine/2.0-a8nt">features</Link>{" "}
          specifically designed for readers, writers, and editors.
        </p>

        <p>
          Analog.Cafe is{" "}
          <Link to="https://github.com/roast-cms">open-source</Link>.
        </p>

        <h3>Contact, connect.</h3>
        <p>
          If you have a question, suggestion or just want to chat, feel free to
          email <ContactInfo />, or:
        </p>
        <ButtonGroup>
          <FollowButtons />
          <CardIntegrated>
            <MailChimpPrefill
              buttonText={TEXT_LABELS.SUBSCRIBE}
              formLocation="About"
            />
          </CardIntegrated>
          <Byline
            style={{
              maxWidth: "320px",
              display: "block",
              margin: "0 auto"
            }}
          >
            Weekly emails (
            <Link
              onClick={() => {
                GA.event({
                  category: "Campaign",
                  action: "ActionsCard.subscribe_example"
                })
              }}
              to="https://us4.campaign-archive.com/?u=256339f7eafa36f2f466aca44&id=434dbe7e2b"
            >
              like this one
            </Link>
            ) come every Tuesday. We{" "}
            <Link to="/privacy-policy">never share or sell</Link> your personal
            information.
          </Byline>
        </ButtonGroup>

        <h3>Thank you, project backers!</h3>
        <p>
          Analog.Cafe began as a dream to bring together a community of writers,
          artists and film photographers and promote the creative and
          informative products of ambition, generosity and imagination. With the
          financial help and moral support of the fifty-one backers on our first
          Kickstarter campaign, we were able to build and grow into a prominent
          home the remarkable, the beautiful, and the fascinating.
        </p>
        <ThankYouList>
          Thayanantha Thevanayagam
          <br />
          Betty Dai
          <br />
          Kevin Kethcart
          <br />
          Fernando Lavin (@film.lav)
          <br />
          Lee Webb
          <br />
          Lewis Phan
          <br />
          Genester
          <br />
          Jose Altamirano (josekasek)
          <br />
          Marianne Oliver
          <br />
          Michael Jones
          <br />
          Tim Dobbs
          <br />
          James Cockroft
          <br />
          faultyflipflap
          <br />
          Jennifer Precious Finch
          <br />
          Denise
          <br />
          Frank Russo
          <br />
          Domenico Stefani
          <br />
          Stephen King
          <br />
          Arjun Mohan
          <br />
          Kevin Aungle
          <br />
          Jack Yu
          <br />
          Stephen Dowling
          <br />
          Anonymous
          <br />
          Joey Pasco
          <br />
          Kanoa Mulling
          <br />
          BVH
          <br />
          Jacob Michael Hanania
          <br />
          Rob James Davie
          <br />
          Joey Santiago
          <br />
          Danielle Cardoz
          <br />
          Francisco M<br />
          Jonathan Zobro
          <br />
          Matthew Stollmeyer
          <br />
          Ishtiaq Rahman
          <br />
          Lu Yu
          <br />
          Jan Ian Chow
          <br />
          Olga Tcherbadji
          <br />
          Andreea Cojocaru
          <br />
          Jeff Santos
          <br />
          Arjan Wiertz
          <br />
          Stepan Cherbadzhi
          <br />
          Jackie Wong
          <br />
          Vivian Qiu
          <br />
          Ben Yee
          <br />
          Ashley Taylor
          <br />
          Anonymous
          <br />
          Anonymous
          <br />
          Geraldine Pontius
          <br />
          Larry Treadway
          <br />
          Hakan (@haknization)
          <br />
          Ben Cairns
        </ThankYouList>
        <p style={{ textAlign: "center" }}>
          <small>
            <Link to="/privacy-policy">Privacy Policy</Link> ・{" "}
            <Link to="/submit/rules">Rules</Link> ・{" "}
            <Link to="/submit/restore">Restore Submission</Link>
          </small>
        </p>
      </ArticleSection>
    </ArticleWrapper>
  )
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  null
)(About)
