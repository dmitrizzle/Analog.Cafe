import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { BurgerMenu, sectionButtons } from "../List/components/ListDescription"
import { LabelWithSearchSVG } from "../../controls/Nav/components/NavGeneral"
import { buttonMaker } from "../../forms/Search"
import { fetchAuthorsList } from "../../../../user/store/actions-community"
import { makeFroth } from "../../../../utils"
import { setModal } from "../../../store/actions-modal"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import Email from "../../vignettes/Email"
import Figcaption from "../../vignettes/Picture/components/Figcaption"
import Figure, { bleed } from "../../vignettes/Picture/components/Figure"
import HeaderLarge from "../../vignettes/HeaderLarge"
import Link from "../../controls/Link"
import MetaTags from "../../vignettes/MetaTags"
import Modal from "../../controls/Modal"
import Search from "../../icons/Search"
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
const AuthorIcon = styled(Link)`
  display: block;
  width: ${props => props.theme.size.block.padding * 2}em;
  height: ${props => props.theme.size.block.padding * 2}em;
  margin: ${props => props.theme.size.block.spacing / 4}em;
  overflow: hidden;
  border-radius: ${props => props.theme.size.block.padding}em;
  background-size: cover !important;
  background-color: ${props => props.theme.color.brand()};
`

class About extends React.PureComponent {
  componentDidMount = () => {
    this.props.fetchAuthorsList({ itemsPerPage: 100 })
  }
  render = () => (
    <React.Fragment>
      <ArticleWrapper>
        <MetaTags metaTitle={metaTitle} metaDescription={metaDescription} />
        <HeaderLarge
          pageTitle="Analog.Cafe"
          pageSubtitle="A Film Photography Magazine"
        />

        <ArticleSection>
          <p>
            <strong>
              <Link to="/">Analog.Cafe</Link>
            </strong>{" "}
            features long- and short-form photo essays on art, travel, and
            culture. We strive to be{" "}
            <strong>nonsensational, well edited, and well illustrated.</strong>
          </p>
          <p>
            We use, promote and write about{" "}
            <Link to="/zine/a-beginners-guide-to-film-photography-zq0f">
              film photography
            </Link>
            : another central topic of this magazine.
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
                    rangefinder camera, manufactured in the mid-1950s. The
                    camera is uniquely-built, with a lot of thought and care put
                    into the manufacturing process.
                  </span>
                ),
                buttons: [
                  {
                    to: "/zine/vitessa-fzyi",
                    text: "Learn More"
                  }
                ]
              },
              id: "hints/vitessa-l"
            }}
          >
            <Figure src="image-froth_1206996_r1CqlUwRm" />
          </Modal>
          <p>
            The{" "}
            <strong>
              <Link to="/">front page</Link>
            </strong>{" "}
            of this website features all of our newest articles. It can be
            filtered down into five main{" "}
            <Modal
              element="a"
              with={{
                info: {
                  menu: true,
                  title: (
                    <span>
                      <BurgerMenu /> Sections
                    </span>
                  ),
                  buttons: sectionButtons.map(section => buttonMaker(section))
                },
                id: "about/sections"
              }}
            >
              sections
            </Modal>
            . Or you can use search to{" "}
            <Modal
              element="a"
              with={{
                info: {
                  search: true,
                  menu: false,
                  socialButtons: true,
                  title: (
                    <LabelWithSearchSVG>
                      <Search /> Find
                    </LabelWithSearchSVG>
                  )
                },
                id: "nav/find"
              }}
            >
              find
            </Modal>{" "}
            what you need.
          </p>
          <p>
            The{" "}
            <strong>
              <Link to="/resources">resources</Link>
            </strong>{" "}
            page features our growing knowledge base on art and photography. It
            inclues guides, reviews, printables, audio, helpful links and
            exclusive essays.
          </p>
          <p>
            To get full access to the <em>resources</em> you will need a free{" "}
            <strong>
              <Link to="/sign-in">Analog.Cafe account</Link>
            </strong>
            . With it you can also vote for and save your{" "}
            <span style={{ display: "inline-block" }}>
              favourites
              <span style={{ color: "#ed216c" }}>❤</span>
            </span>{" "}
            and <Link to="/submit">submit</Link> your work to get featured.
          </p>

          <h3>Authors, members, and editors.</h3>

          <p>
            Our content comes from guest and regular writers around the world.
            As of now, there are {this.props.community.authorsList.items.length}{" "}
            published authors. Some of us are prominent film photographers,
            others are casual and professional writers, artists, or camera
            afficionados.
          </p>
          <AuthorsBanner src="image-froth_1533636_rygH__d9kQ">
            <Authors>
              {this.props.community.authorsList.items.map((item, index) => {
                const image = makeFroth({ src: item.image, size: "t" }).src

                return (
                  <AuthorIcon
                    style={{ backgroundImage: `url(${image})` }}
                    to={`/is/${item.id}`}
                    key={index}
                  />
                )
              })}
            </Authors>
          </AuthorsBanner>
          <h3>A brief history.</h3>
          <p>
            This project got initiated in 2017 as a plan for a community
            publishing platform.
          </p>
          <p>
            Analog.Cafe got funded via Kickstarter on May 5<sup>th</sup>. The
            website went live on{" "}
            <Link to="/zine/analog-cafe-e8tr">July 27, 2017</Link>. Today it’s
            maintained by <Link to="/is/dmitrizzle">Dmitri</Link> – hello! 👋
          </p>
          <p>
            My wife, <Link to="/is/betty">Betty</Link>, has been a tremendous
            help in setting the tone, quality, and consistency of the articles.
            None of this would make sense without her help and the fantastic
            people who supported me along this journey.
          </p>

          <h3>How to reach us.</h3>
          <Link to="/is/dmitrizzle">
            <Figure src="image-froth_1479844_S14eOAhIN" caption>
              This is me, Dmitri. Writing right back via pigeon mail.
              <br />
              Just kidding, I’ll get back to you within 24 hours. 🙃
            </Figure>
          </Link>

          <p>
            You can usually find authors’ contact info in the bio, linked in
            every article on Analog.Cafe.
          </p>
          <p>
            If you’d like to chat with the founder, editor, developer, big
            cheese, whatever – <Email /> me, or reach out via{" "}
            <strong>
              <Link to="https://twitter.com/analog_cafe">Twitter</Link>
            </strong>{" "}
            and{" "}
            <strong>
              <Link to="https://instagram.com/analog_cafe">Instagram</Link>
            </strong>
            .
          </p>
          <p>
            <strong>
              <Link to="/submit">Submissions</Link>
            </strong>{" "}
            are welcome!
          </p>
          <hr />
          <h3>Thank you, project backers!</h3>
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
        </ArticleSection>
      </ArticleWrapper>
    </React.Fragment>
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
