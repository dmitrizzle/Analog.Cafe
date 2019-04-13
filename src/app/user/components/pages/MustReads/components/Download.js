import React from "react"

import { withRouter } from "react-router"

import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../../core/components/pages/Article/components/ArticleWrapper"
import Cube from "../../../../../core/components/icons/group-beacons/Cube"
import HeaderLarge from "../../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../../core/components/controls/Link"
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton"
import MetaTags from "../../../../../core/components/vignettes/MetaTags"

const iconStyles = { height: ".75em", paddingBottom: ".15em" }

export const Download = props => {
  const destination = props.history.location.pathname.replace(
    "/download",
    "https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads"
  )
  window.open(destination)
  return (
    <ArticleWrapper>
      <MetaTags metaTitle="Download" />
      <HeaderLarge pageTitle="Download" />
      <ArticleSection>
        <p>
          Your download should start momentarily.{" "}
          <strong>
            <Link to={destination}>Click here</Link>
          </strong>{" "}
          if it doesn’t.
        </p>
        <LinkButton to="/resources" branded>
          <span>
            <Cube style={iconStyles} /> Return to Resources
          </span>
        </LinkButton>
      </ArticleSection>
    </ArticleWrapper>
  )
}

export default withRouter(Download)

// https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads
