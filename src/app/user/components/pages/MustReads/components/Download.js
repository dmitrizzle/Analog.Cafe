import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { withRouter } from "react-router"

import { GA } from "../../../../../utils"
import { MUST_READS_CONTENT } from "../constants"
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

  // verify
  const validFiles = MUST_READS_CONTENT.downloads.map(download => download.to)
  const isValidRequest = validFiles.includes("/download/" + filename)
  const hasPermission = props.user.status === "ok"

  return (
    <ArticleWrapper>
      <MetaTags metaTitle="Your Download is Ready" />
      <HeaderLarge
        pageTitle={isValidRequest && hasPermission ? "Download Ready" : "Error"}
        pageSubtitle={
          isValidRequest && hasPermission ? "╰( ⁰ ਊ ⁰ )━☆ﾟ.*･｡ﾟ" : ""
        }
      />
      <ArticleSection>
        {isValidRequest &&
          hasPermission && (
            <React.Fragment>
              <p>
                <strong>File:</strong>{" "}
                <small>
                  <Code>
                    <Link
                      to={destination}
                      onClick={() =>
                        GA.event({
                          category: "Download",
                          action: "Download.link",
                          label: destination
                        })
                      }
                    >
                      {filename}
                    </Link>
                  </Code>
                </small>
              </p>
              <LinkButton
                to={destination}
                branded
                onClick={() =>
                  GA.event({
                    category: "Download",
                    action: "Download.button",
                    label: destination
                  })
                }
              >
                <span>
                  <Cube style={iconStyles} /> Download Now
                </span>
              </LinkButton>
            </React.Fragment>
          )}
        {!isValidRequest && (
          <p>
            <strong>Could not find file</strong>{" "}
            <small>
              <Code>{filename}</Code>
            </small>
          </p>
        )}
        {!hasPermission && (
          <p>
            You need to{" "}
            <strong>
              <Link to="/sign-in">sign in</Link>
            </strong>{" "}
            to access this file.
          </p>
        )}
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
