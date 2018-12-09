import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { CARD_ALERTS } from "../../../../user/constants/messages-submission"
import { ROUTE_API_AUTHORS } from "../../../constants/routes-article"
import { fetchAuthorsList } from "../../../../user/store/actions-community"
import { makeFroth } from "../../../../utils"
import { setModal } from "../../../store/actions-modal"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import ContactInfo from "../../vignettes/ContactInfo"
import Figure, { bleed } from "../../vignettes/Picture/components/Figure"
import HeaderLarge from "../../vignettes/HeaderLarge"
import Link from "../../controls/Link"
import MetaTags from "../../vignettes/MetaTags"
import Modal from "../../controls/Modal"
import ThankYouList from "./components/ThankYouList"

const metaTitle = "About"
const metaDescription =
  "Analog.Cafe is created by film photographers, artists, and writers of the internet. Published every Tuesday and most Thursday mornings. Maintained as an open-source project by Dmitri."

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
      <HeaderLarge
        pageTitle="Analog.Cafe"
        pageSubtitle="A Film Photography Magazine"
      />

      <ArticleSection>
        <blockquote>
          Created by film photographers, artists, and writers of the internet.{" "}
          <strong>
            Published <Link to="/">online</Link>
          </strong>{" "}
          every Tuesday and most Thursday mornings.{" "}
          <Link to="https://github.com/dmitrizzle/Analog.Cafe">Maintained</Link>{" "}
          as an open-source project by{" "}
          <Modal
            with={{
              request: {
                url: ROUTE_API_AUTHORS + "/dmitrizzle"
              }
            }}
          >
            Dmitri
          </Modal>
          .
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

        <h3>The authors.</h3>
        <p>
          Analog.Cafe got its name in 2017 when{" "}
          <Modal
            with={{
              request: {
                url: ROUTE_API_AUTHORS + "/dmitrizzle"
              }
            }}
          >
            Dmitri
          </Modal>{" "}
          began working on a community photography/writing project. It has since
          grown ten-fold in readership and written contributions.
        </p>
        <p>
          It takes conviction to favour analogue, tangible processes in the age
          of advancing digital technology. Analog.Cafe project is dedicated to
          exhibiting and promoting the works of such people. We are{" "}
          <Link to="/submit">always</Link> looking for new publishing members.
        </p>
        <h3>The editors.</h3>
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
          and Dmitri pick and edit every article, keeping the content
          interesting, thoughtful, and readable.
        </p>

        <h3>Film Photography.</h3>

        <p>
          Almost every image on this website has originated on a roll of film,
          for what’s known as <em>film photography</em>.
        </p>
        <Modal
          unmarked
          element="a"
          with={{
            info: {
              image: "image-froth_1206996_r1CqlUwRm",
              title: "Voigtländer Vitessa L",
              text: (
                <span>
                  <strong>Voigtländer Vitessa</strong> is a German 35mm film
                  rangefinder camera, manufactured in the mid-1950s. The camera
                  is uniquely-built, with a lot of thought and care put into the
                  manufacturing process.
                </span>
              ),
              buttons: [
                {
                  to: "/zine/vitessa-fzyi",
                  text: "More on Vitessa",
                  branded: true
                }
              ]
            },
            id: "modal/hints/vitessa-l"
          }}
        >
          <Figure src="image-froth_1206996_r1CqlUwRm" />
        </Modal>
        <p>
          Most stories and articles on Analog.Cafe are either about{" "}
          <Link to="/film-photography">film photography</Link> or have it
          involved in the image making. The reason is our collective passion and
          appreciation for the analogue process and{" "}
          <Link to="/zine/analogue-photography-98f3">technology</Link>.
        </p>
        <p>
          We believe that film photography helps us create more thoughtful,
          beautiful, and truthful stories.
        </p>

        <h3>Photo Essays.</h3>
        <p>
          Travel, culture, thought pieces, art projects. Photography is more
          than gear and chemicals. Analog.Cafe’s{" "}
          <em>
            <Link to="/photo-essays">Photo Essays</Link>
          </em>{" "}
          section is a collection of abstract photography, thought-provoking
          essays, observations, travel, culture, and items of interest.
        </p>

        <h3>The Website.</h3>
        <p>
          Analog.Cafe respects <Link to="/privacy-policy">privacy</Link>, works{" "}
          <Modal
            with={{
              ...CARD_ALERTS.AUTO_SAVE,
              info: {
                ...CARD_ALERTS.AUTO_SAVE.info,
                title: "Create Offline",
                text:
                  "If you are working on your submission to Analog.Cafe, be it a photo essay or a review, you can safely continue adding your images and text even when you have no access to the internet. All your work will be saved in your web browser automatically.",
                buttons: [
                  {
                    to: "/submit",
                    text: "How to Submit",
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

        <h3>Contact Info.</h3>
        <Figure src="image-froth_663152_ByGEigckN" />
        <p>
          If you have a question, suggestion or just want to chat, feel free to
          email Dmitri via <ContactInfo />, or reach out via{" "}
          <strong>
            <Link to="https://twitter.com/analog_cafe">Twitter</Link>
          </strong>
          ,{" "}
          <strong>
            <Link to="https://www.facebook.com/analog8cafe">Facebook</Link>
          </strong>
          , or{" "}
          <strong>
            <Link to="https://instagram.com/analog_cafe">Instagram</Link>
          </strong>
          .
        </p>
        <p>
          Analog.Cafe is a global project, initiated in{" "}
          <Link to="/zine/chiang-mai-d7jy">Chiang Mai</Link>, in collaboration
          with authors and photographers from a growing list of locations.
        </p>
        <p>🇺🇸🇬🇧🇨🇦🇹🇭🇯🇵🇬🇷🇸🇰🇨🇳🇭🇰🇵🇭🇸🇬🇻🇳🇮🇪🇻🇪🇵🇹🇲🇾 </p>
        <p>
          Currently, Dmitri is maintaining the project from his home in{" "}
          <Link to="/zine/expat-years-6sje">Vancouver</Link>.
        </p>

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
