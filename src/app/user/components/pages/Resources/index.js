import { connect } from "react-redux"
import React from "react"
import styled, { css } from "styled-components"

import { GA, makeFroth } from "../../../../utils"
import { MUST_READS_CONTENT } from "./constants"
import { setModal } from "../../../../core/store/actions-modal"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import Byline from "../../../../core/components/vignettes/Byline"
import GridButton from "../../../../admin/components/controls/Grid/components/GridButton"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../core/components/controls/Link"
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import NavMini from "../../../../core/components/controls/Nav/components/NavMini"

export const Posters = styled.div`
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100vw;
  margin-left: calc(50vh - 750px);
  ${props => props.theme.size.breakpoint.min.l`
  		margin-left:	calc(( -100vw + ${props =>
        props.theme.size.block.column.m}px )/2 - ${props =>
    props.theme.size.block.padding}em);
  	`}
    ${props => props => props.theme.size.breakpoint.min.xxl`
  		margin-left:	calc(( -100vw + ${props =>
        props.theme.size.block.column.l}px )/2 - ${props =>
      props.theme.size.block.padding}em);
  	`}
    ${props => props.theme.size.breakpoint.max.m`
		margin-left: -1.5em;
	`}
    > div {
    display: flex;
  }
`
const posterDimensions = css`
  width: 6.93em;
  height: 11.7558em;
`
export const Poster = styled(Link)`
  ${posterDimensions} ${props => props.theme.typography.title.auto}

  margin: 0 ${props => props.theme.size.block.spacing * 0.5}em 0 0;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  color: ${props => props.theme.color.background()} !important;
  text-decoration: none;
  line-height: ${props => props.theme.size.block.spacing * 1.15}em;
  text-shadow: 1px 2px 0px ${props => props.theme.color.foreground()};
  font-size: ${props => props.theme.size.font.make.normal * 1.15}em;

  background: ${props =>
    props.theme.color.foreground(props.theme.opacity.least)}
    url(${props =>
      makeFroth({
        src: props.src,
        size: "m"
      }).src}) ${props => props.center && "center"}
     !important;
  background-size: cover !important;
  border-bottom: ${props => props.theme.elements.thickBorder};
  box-shadow: 0 0 0.5em
    ${props => props.theme.color.foreground(props.theme.opacity.least)};
  ${props => props.theme.size.breakpoint.max.m`
    border-radius:	${props => props.theme.effects.borderRadius.small}em;
  `};

  > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: ${props => props.theme.size.block.padding / 7}em;
    background: ${props =>
      props.theme.color.foreground(props.theme.opacity.half / 1.5)};
  }
`

export const PosterExtra = styled(GridButton)`
  bottom: 1.33em;
  position: absolute;
  right: 0.15em;
  min-height: 0;
  width: 100%;
  margin: 0;
  line-height: 1em;
`
export const Spacer = styled.div`
  width: 0.5em;
  height: 11.7558em;
  flex-shrink: 0;
`
export const Carousel = props => (
  <Posters>
    <div>
      {props.items.map((item, num) => (
        <React.Fragment key={item.title}>
          {num === 0 && <Spacer />}
          <Poster
            src={item.poster}
            center={props.center}
            to={item.to}
            onClick={event => {
              GA.event({
                category: "Navigation",
                action: "Features.poster",
                label: item.title
              })
            }}
          >
            <div>{item.title}</div>
            {item.extra && <PosterExtra label={item.extra.replace("_", " ")} />}
          </Poster>
          {num === props.items.length - 1 && <Spacer last />}
        </React.Fragment>
      ))}
    </div>
  </Posters>
)

const ExclusiveContent = props => (
  <React.Fragment>
    <h3>Free PDF Downloads</h3>
    <Carousel items={MUST_READS_CONTENT.downloads} {...props} />
    <p style={{ lineHeight: "1.2em" }}>
      <small>
        <em>
          Download our exclusive guides and photo essays (PDF) for offline
          reading. Formatted to be easily printed on any standard paper. You’ll
          need a{" "}
          <Link to="/sign-in">
            <strong>free Analog.Cafe Account</strong>
          </Link>
          .
        </em>
      </small>
    </p>
    <p style={{ lineHeight: "1.2em" }}>
      <small>
        <em>
          <strong>Pre Releases</strong> are articles which can be read ahead of
          their publication date. Exclusive to Analog.Cafe Account holders.
        </em>
      </small>
    </p>
  </React.Fragment>
)

export const Resources = props => {
  return (
    <ArticleWrapper>
      <MetaTags metaTitle="Features" />
      <HeaderLarge pageTitle="Features">
        <Byline>
          <NavMini view="resources" />
        </Byline>
      </HeaderLarge>
      <ArticleSection>
        <ExclusiveContent {...props} />
        <h3>Essential Guides</h3>
        <Carousel items={MUST_READS_CONTENT.guides} {...props} />
        <p style={{ lineHeight: "1.2em" }}>
          <small>
            <em>
              Understand film photography better, shop smarter, and get
              published with this collection of articles on this topic.
            </em>
          </small>
        </p>
        <h3>
          Best of <Link to="/photo-essays">Photo Essays</Link>
        </h3>
        <Carousel items={MUST_READS_CONTENT.essays} {...props} center={1} />
        <p style={{ lineHeight: "1.2em" }}>
          <small>
            <em>
              Read the best-illustrated and most inspiring photo essays written
              by our community of guest and regular contributors.
            </em>
          </small>
        </p>
        <h3>Camera Reviews</h3>
        <Carousel
          items={MUST_READS_CONTENT["camera-reviews"]}
          {...props}
          center={1}
        />
        <p style={{ lineHeight: "1.2em" }}>
          <small>
            <em>
              Learn about the detailed, personal accounts with some of the most
              iconic film cameras and get acquainted with their triumphs and
              shortcommings.
            </em>
          </small>
        </p>
        <h3>Film and Emulsions</h3>
        <Carousel items={MUST_READS_CONTENT.emulsions} {...props} center={1} />
        <p style={{ lineHeight: "1.2em" }}>
          <small>
            <em>
              Reviews, experiments, history and personal accounts with a
              particular film stock.
            </em>
          </small>
        </p>
      </ArticleSection>
    </ArticleWrapper>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resources)
