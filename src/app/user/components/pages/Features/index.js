import LazyLoad from "react-lazyload"
import React from "react"
import styled, { css } from "styled-components"

import { GA, makeFroth } from "../../../../utils"
import { MUST_READS_CONTENT } from "./constants"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import GridButton from "../../../../admin/components/controls/Grid/components/GridButton"
import Link from "../../../../core/components/controls/Link"

export const SolidDivider = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.color.foreground()};
`

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
          <React.Fragment>
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
          </React.Fragment>
        </LazyLoad>
      ))}
    </div>
  </Posters>
)

export default props => {
  return (
    <ArticleWrapper>
      <ArticleSection>
        <h3>Essential Photography Guides</h3>
        <SolidDivider />

        <Carousel items={MUST_READS_CONTENT.guides.slice(0, 5)} {...props} />
        <Carousel
          chop
          items={MUST_READS_CONTENT.guides.slice(5, 15)}
          {...props}
        />

        <div style={{ height: "6em" }} />

        <h3>Film Cameras</h3>
        <SolidDivider />
        <Carousel
          items={MUST_READS_CONTENT["camera-reviews"].slice(0, 5)}
          {...props}
          center={1}
        />
        <Carousel
          chop
          items={MUST_READS_CONTENT["camera-reviews"].slice(5, 15)}
          {...props}
          center={1}
        />

        <div style={{ height: "6em" }} />

        <h3>Film & Chemistry</h3>
        <SolidDivider />
        <Carousel
          items={MUST_READS_CONTENT.emulsions.slice(0, 5)}
          {...props}
          center={1}
        />
        <Carousel
          chop
          items={MUST_READS_CONTENT.emulsions.slice(5, 15)}
          {...props}
          center={1}
        />

        <div style={{ height: "6em" }} />

        <h3>Photo Essays</h3>
        <SolidDivider />
        <Carousel
          items={MUST_READS_CONTENT.essays.slice(0, 5)}
          {...props}
          center={1}
        />
        <Carousel
          chop
          items={MUST_READS_CONTENT.essays.slice(5, 15)}
          {...props}
          center={1}
        />

        <div style={{ height: "6em" }} />

        <h3>Download & Print</h3>
        <SolidDivider />
        <Carousel items={MUST_READS_CONTENT.download.slice(0, 5)} {...props} />
        <Carousel
          chop
          items={MUST_READS_CONTENT.download.slice(5, 15)}
          {...props}
        />
      </ArticleSection>
    </ArticleWrapper>
  )
}
