import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { withRouter } from "react-router"

import { GA } from "../../../../../utils"
import { MUST_READS_CONTENT } from "../constants"
import { addSessionInfo } from "../../../../store/actions-user"
import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../../core/components/pages/Article/components/ArticleWrapper"
import Cube from "../../../../../core/components/icons/group-beacons/Cube"
import Figure from "../../../../../core/components/vignettes/Picture/components/Figure"
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

  // get file meta
  const fileList_1 = MUST_READS_CONTENT["download-guides"]
  const fileList_2 = MUST_READS_CONTENT["download-essays"]
  const fileList = [...fileList_1, ...fileList_2]
  const fileData = fileList.filter(
    download => download.to === "/download/" + filename
  )[0]

  const hasPermission = props.user.status === "ok"

  // ╰( ⁰ ਊ ⁰ )━☆ﾟ.*･｡ﾟ

  return (
    <ArticleWrapper>
      <MetaTags metaTitle="Your Download is Ready" />
      <HeaderLarge
        pageTitle={fileData ? fileData.title : "Can’t Find the Download"}
        pageSubtitle={fileData && `${fileData.type} Download`}
      />
      <ArticleSection>
        {fileData &&
          hasPermission && (
            <React.Fragment>
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
        {!hasPermission &&
          fileData && (
            <React.Fragment>
              <LinkButton
                to="/sign-in"
                branded
                onClick={() => {
                  fileData &&
                    props.addSessionInfo({
                      loginSuccess: `/download/${filename}`
                    })
                }}
              >
                Sign In to Download
              </LinkButton>{" "}
              <p style={{ textAlign: "center" }}>
                It only takes a minute to create a free Analog.Cafe account.
              </p>{" "}
            </React.Fragment>
          )}
        {!fileData && (
          <p>
            <strong>Could not find file</strong>{" "}
            <small>
              <Code>{filename}</Code>
            </small>
          </p>
        )}
        {fileData && (
          <Link
            to={hasPermission ? destination : "/sign-in"}
            onClick={() => {
              !hasPermission &&
                props.addSessionInfo({
                  loginSuccess: `/download/${filename}`
                })
            }}
          >
            <Figure feature src={fileData.poster} />
          </Link>
        )}
      </ArticleSection>
    </ArticleWrapper>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addSessionInfo: sessionInfo => {
      dispatch(addSessionInfo(sessionInfo))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Download)
)

// https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads
