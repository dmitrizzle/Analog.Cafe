import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { CARD_ALERTS } from "../../../../user/constants/messages-submission"
import { GA, makeFroth } from "../../../../utils"
import { ROUTE_API_AUTHORS } from "../../../constants/routes-article"
import { TEXT_LABELS } from "../../../constants/messages-"
import { bleed } from "../../vignettes/Picture/components/Figure"
import { fetchAuthorsList } from "../../../../user/store/actions-community"
import { setModal } from "../../../store/actions-modal"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import ButtonGroup from "../../controls/Button/components/ButtonGroup"
import Byline from "../../vignettes/Byline"
import CardIntegrated from "../../controls/Card/components/CardIntegrated"
import ContactInfo from "../../vignettes/ContactInfo"
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
  "A web magazine that publishes weekly creative and insightful works by a community of artists, writers and film photographers."

const AuthorsBanner = styled.div`
  width: 100vw;
  min-height: 26em;
  height: 66vw;
  max-height: 36em;
  overflow: hidden;

  padding: ${props => props.theme.size.block.padding * 2}em 0 0;
  background-image: url(${props =>
    makeFroth({ src: props.src, size: "l" }).src});
  ${props => props.theme.size.breakpoint.max.l`
      background-image: url(${props =>
        makeFroth({ src: props.src, size: "m" }).src});
    `};
  background-size: cover;
  background-position: bottom center;

  margin-left: calc(
    (-100vw + ${props => props.theme.size.block.column.m}px) / 2 -
      ${props => props.theme.size.block.padding}em
  );
  ${props => props.theme.size.breakpoint.max.m`
    ${bleed}
  `};
  ${props => props.theme.size.breakpoint.min.xxl`
  margin-left:	calc(( -100vw + ${props =>
    props.theme.size.block.column.l}px )/2 - ${props =>
    props.theme.size.block.padding}em );
`}

  border-bottom: ${props => props.theme.elements.thickBorder};
`
const Authors = styled.div`
  display: flex;
  max-width: ${props => props.theme.size.block.column.m}px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
`
const AuthorIcon = styled.a`
  display: block;
  width: ${props => props.theme.size.block.padding * 2}em;
  height: ${props => props.theme.size.block.padding * 2}em;
  margin: ${props => props.theme.size.block.spacing / 4}em;
  overflow: hidden;
  border-radius: ${props => props.theme.size.block.padding}em;
  background-size: cover !important;
`

class About extends React.PureComponent {
  componentDidMount = () => {
    this.props.fetchAuthorsList({ itemsPerPage: 100 })
  }
  render = () => (
    <ArticleWrapper>
      <MetaTags metaTitle={metaTitle} metaDescription={metaDescription} />
      <HeaderLarge pageTitle="Analog.Cafe" />

      <ArticleSection>
        <blockquote>
          Weekly photo stories on <strong>art, culture, travel</strong>. Also,
          film cameras. Created by film photographers, artists, and writers of
          the internet.
        </blockquote>
        <AuthorsBanner src="image-froth_1533636_rygH__d9kQ">
          <Authors>
            {this.props.community.authorsList.items.map((item, count) => {
              const image = makeFroth({ src: item.image, size: "t" }).src

              return (
                <Modal
                  key={item.id}
                  element={"div"}
                  with={{
                    info: item,
                    id: `authors/${item.id}`
                  }}
                >
                  <AuthorIcon
                    style={{ backgroundImage: `url(${image})` }}
                    href={`author/${item.id}`}
                  />
                </Modal>
              )
            })}
          </Authors>
        </AuthorsBanner>

        <h3>Magazine.</h3>
        <p>
          Every week, we publish creative{" "}
          <Link to="/photo-essays">photo essays</Link>, as well as insightful{" "}
          <Link to="/guides">guides</Link>, <Link to="/reviews">reviews</Link>,
          and <Link to="/stories">stories</Link>.
        </p>
        <p>
          <strong>Film photography</strong> is our tool of choice for 99% of all
          published images on Analog.Cafe. An analogue, tangeable medium that
          uses chemistry to capture light. Check out{" "}
          <Link to="/zine/analogue-photography-98f3">this</Link> guide and{" "}
          <Link to="/zine/my-love-for-film-lw88">this</Link> photo essay to find
          out why.
        </p>

        <p>
          If you shoot film and would like to be a part of this{" "}
          <strong>passion project</strong>, join us:
        </p>

        <ButtonGroup>
          <LinkButton
            branded
            to={this.props.userStatus === "ok" ? "/submit/compose" : "/submit"}
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

const mapDispatchToProps = dispatch => {
  return {
    fetchAuthorsList: (options, page) => {
      dispatch(fetchAuthorsList(options, page))
    },
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    community: state.community
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)
