import React from "react"

import { ROUTE_API_AUTHORS } from "../../../constants/routes-article"
import { TEXT_LABELS } from "../../../constants/messages-"
import { smartGreeting } from "../../../utils/messages-"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import ButtonGroup from "../../controls/Button/components/ButtonGroup"
import Byline from "../../vignettes/Byline"
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
  "Story, reason for existence, contributos and resources."

export default () => {
  return (
    <ArticleWrapper>
      <MetaTags metaTitle={metaTitle} metaDescription={metaDescription} />
      <HeaderLarge
        pageTitle="Analog.Cafe"
        pageSubtitle="A Film Photography Publication"
      />
      <ArticleSection>
        <Figure src="image-froth_1998002_HJcNND1bQ" feature alt="(⊙ᗜ⊙)">
          <span style={{ transform: "rotate(90deg)", display: "inline-block" }}>
            ↬
          </span>
        </Figure>
        <h3>{smartGreeting()}</h3>
        <p>
          Analog.Cafe, “a film photography publication,” is a blog that
          publishes creative and informative content, mainly made by people who
          enjoy shooting film, for everyone who enjoys human creativity and
          appreciates <Link to="/zine/analogue-photography-98f3">analogue</Link>{" "}
          technology. The irony of this topic being discussed online is
          recognized. 😏
        </p>

        <h3>Photographers, authors, nerds, hobbyists, artists.</h3>
        <p>
          Most of the articles published on this website are created by people
          who <Link to="/submit">submit</Link> their{" "}
          <Link to="/photo-essays">photo essays</Link>,{" "}
          <Link to="/guides">guides</Link>, <Link to="/reviews">reviews</Link>,
          and <Link to="/stories">stories</Link>. Most of them are{" "}
          <Link to="/solo-projects">solo projects</Link>, but some are{" "}
          <Link to="/collaborations">collaborations</Link>.
        </p>

        <h3>Editors.</h3>
        <p>
          <Modal
            with={{
              request: {
                url: ROUTE_API_AUTHORS + "/dmitrizzle"
              }
            }}
          >
            dmitrizzle
          </Modal>{" "}
          and{" "}
          <Modal
            with={{
              request: {
                url: ROUTE_API_AUTHORS + "/betty"
              }
            }}
          >
            Betty
          </Modal>{" "}
          edit every article on this blog, doing their best to maintain a high
          level of quality, captivating content.
        </p>

        <h3>Developers.</h3>
        <p>
          Adding to the irony of this blog’s obsession with analogue, it is also
          a technological journey into the world of web interface development.
          This website is a custom-built solution, kicked off by dmitrizzle and
          his friends at Banana Coding and maintained as an{" "}
          <Link to="https://github.com/dmitrizzle/Analog.Cafe">
            open-source
          </Link>{" "}
          project.
        </p>

        <h3>Contact, connect.</h3>
        <p>
          If you have a question, suggestion or just want to chat, feel free to
          email <ContactInfo />, or:
        </p>
        <FollowButtons />
        <MailChimpPrefill
          buttonText={TEXT_LABELS.SUBSCRIBE}
          formLocation="About"
        />
        <Byline
          style={{
            maxWidth: "320px",
            display: "block",
            margin: "0 auto"
          }}
        >
          Weekly emails (<Link
            onClick={() => {
              import("react-ga").then(ReactGA => {
                ReactGA.event({
                  category: "Campaign",
                  action: "ActionsCard.subscribe_example"
                })
              })
            }}
            to="https://us4.campaign-archive.com/?u=256339f7eafa36f2f466aca44&id=434dbe7e2b"
          >
            like this one
          </Link>) come every Tuesday. We{" "}
          <Link to="/privacy-policy">never share or sell</Link> your personal
          information.
        </Byline>

        <p>
          Please also feel free to <Link to="/submit">submit</Link> your
          articles for consideration:
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

        <h3>Thank you, project backers.</h3>
        <p>
          There are bills associated with the technology required to run
          Analog.Cafe and there’s value to the time spent by all who make this
          project possible. The people who make financial contributions, however
          small, are supporting this blog and validating its existence in ways
          not possible without their generosity:
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
      </ArticleSection>
    </ArticleWrapper>
  )
}
