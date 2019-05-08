import { connect } from "react-redux"
import LazyLoad from "react-lazyload"
import React from "react"
import styled, { css } from "styled-components"

import { GA, makeFroth } from "../../../../utils"
import { MUST_READS_CONTENT } from "./constants"
import { setModal } from "../../../../core/store/actions-modal"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import GridButton from "../../../../admin/components/controls/Grid/components/GridButton"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../core/components/controls/Link"
import MetaTags from "../../../../core/components/vignettes/MetaTags"

export const Posters = styled.div`
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100vw;
  padding: 1em 0 0;
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
  width: 26em;
  height: 12em;
`
export const Poster = styled(Link)`
  ${posterDimensions}

  margin: 0 ${props => props.theme.size.block.spacing * 0.5}em 0 0;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  background: #fafafa;

  text-decoration: none;
  line-height: ${props => props.theme.size.block.spacing * 1.15}em;


  border-bottom: ${props => props.theme.elements.thickBorder};
  box-shadow: 0 0 0.5em
    ${props => props.theme.color.foreground(props.theme.opacity.least)};
  ${props => props.theme.size.breakpoint.max.m`
    border-radius:	${props => props.theme.effects.borderRadius.small}em;
  `};
`
export const PosterImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 8em;
  bottom: 0;
  background: ${props =>
      props.theme.color.foreground(props.theme.opacity.least)}
    url(${props =>
      makeFroth({
        src: props.src,
        size: "m"
      }).src})
    ${props => props.center && "center"} !important;
  background-size: cover !important;
`

export const PosterInfo = styled.div`
  position: absolute;
  top: 0;
  right: 0.5em;
  left: calc(8em + 1em);
  bottom: 0;

  h4 {
    font-size: 1em;
  }
`

export const PosterExtra = styled(GridButton)`
  bottom: 1.33em;
  position: absolute;
  box-shadow: none;
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
    <div style={{ marginLeft: props.chop ? "1.5em" : undefined }}>
      {props.items.map((item, num) => (
        <LazyLoad unmountIfInvisible once height="12em" key={item.title}>
          {num === 0 && <Spacer />}
          <Poster
            to={item.to}
            onClick={event => {
              GA.event({
                category: "Navigation",
                action: "Features.poster",
                label: item.title
              })
            }}
          >
            <PosterImage src={item.poster} center={props.center} />
            <PosterInfo>
              <h4>
                {item.type && item.type === "↯ PDF Download" && "DOWNLOAD: "}
                {item.title}
              </h4>
              <small>
                <em>{item.text}</em>
              </small>
            </PosterInfo>

            {item.type && <PosterExtra label={item.type.replace("_", " ")} />}
          </Poster>
          {num === props.items.length - 1 && <Spacer last />}
        </LazyLoad>
      ))}
    </div>
  </Posters>
)

export const Features = props => {
  return (
    <ArticleWrapper>
      <MetaTags metaTitle="Features" metaSubtitle="The Best of Analog.Cafe" />
      <HeaderLarge
        pageTitle="Features"
        pageSubtitle="The Best of Analog.Cafe"
      />

      <ArticleSection>
        <Carousel items={MUST_READS_CONTENT.guides} {...props} />
        <Carousel
          chop
          items={MUST_READS_CONTENT["download-guides"]}
          {...props}
        />
        <h3>Essential Photography Guides</h3>
        <p>
          ☝︎ <strong>Above:</strong> articles to help you improve your film
          photography understanding and techniques.
        </p>

        <div style={{ height: "6em" }} />

        <Carousel items={MUST_READS_CONTENT.essays} {...props} center={1} />
        <Carousel
          chop
          items={MUST_READS_CONTENT["download-essays"]}
          {...props}
        />
        <h3>Photo Essays</h3>
        <p>
          ☝︎ <strong>Above:</strong> stories told with images. Read our
          ever-expanding collection of best-written essays on travel, art,
          self-expression, and creative experiments.
        </p>

        <div style={{ height: "6em" }} />

        <Carousel
          items={MUST_READS_CONTENT["camera-reviews"]}
          {...props}
          center={1}
        />
        <Carousel
          chop
          items={MUST_READS_CONTENT.emulsions}
          {...props}
          center={1}
        />
        <h3>Film & Cameras</h3>
        <p>
          ☝︎ <strong>Above:</strong> film photography reviews and guides. Lean
          about the technical advantages and limitations of each tool or
          accessory. Examine the images created with said film or camera. Get
          the writers’ personal account on use and ownership.
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
)(Features)