import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"
import CountUp from "react-countup"

import { fetchAuthorsList } from "../../../../user/store/actions-community"
import { makeFroth } from "../../../../utils"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import Email from "../../vignettes/Email"
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
            Weekly photo essays on art, travel, and culture. Analogue cameras,
            film, history, and techniques.
          </p>
          <p>
            This web site is a (growing) group effort, with{" "}
            <CountUp
              end={this.props.community.authorsList.items.length}
              duration={5}
              start={Math.floor(
                this.props.community.authorsList.items.length - 10
              )}
              //useEasing={false}
              delay={2}
            />{" "}
            contributing authors as of now.{" "}
            <strong>
              <Link to="/sign-in">Join us!</Link>
            </strong>
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
            This project budded in 2017 as an idea for a community publishing
            platform.
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

          <p>
            Almost every image on this website is shot on film. There could be a
            book written on why we haven’t given up this medium. The gist: it
            comes with a unique look, process, and memories.{" "}
            <Link to="/zine/a-beginners-guide-to-film-photography-zq0f">
              Give it a try
            </Link>{" "}
            if you haven’t already.
          </p>

          <h3>How to reach us.</h3>
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
            are welcome. 🙌
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
