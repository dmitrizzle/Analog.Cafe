import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { withRouter } from "react-router"

import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../../core/components/pages/Article/components/ArticleWrapper"
import Cube from "../../../../../core/components/icons/group-beacons/Cube"
import HeaderLarge from "../../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../../core/components/controls/Link"
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton"
import MetaTags from "../../../../../core/components/vignettes/MetaTags"

const iconStyles = { height: ".75em", paddingBottom: ".15em" }

export const Code = styled.code`
  background: #f7f7f7;
  padding: 0.25em 0.5em;
  border-radius: 0.3em;
`

export const Download = props => {
  const filename = props.history.location.pathname.replace("/download/", "")
  const destination = `https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads/${filename}`

  window.open(destination)
  return (
    <ArticleWrapper>
      <MetaTags metaTitle="Download" />
      <HeaderLarge pageTitle="Download" />
      <ArticleSection>
        <p>
          <strong>File:</strong>{" "}
          <small>
            <Code>
              <Link to={destination}>{filename}</Link>
            </Code>
          </small>
        </p>
        <LinkButton to={destination} branded>
          <span>
            <Cube style={iconStyles} /> Download Now
          </span>
        </LinkButton>
      </ArticleSection>
    </ArticleWrapper>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Download)
)

// https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads
