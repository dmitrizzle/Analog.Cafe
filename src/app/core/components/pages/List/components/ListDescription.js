import React from "react"
import styled from "styled-components"

import { APP_NAME, HEADER_ERRORS } from "../../../../../constants"
import { getFirstNameFromFull } from "../../../../utils/messages-author"
import { getTitleFromSlug } from "../../../../utils/messages-"
import Link from "../../../controls/Link"
import ListBrandName from "./ListBrandName"
import ListDescriptionWrapper from "./ListDescriptionWrapper"
import ListHeader from "./ListHeader"

export const Desktop = styled.span`
  @media (max-width: 48em) {
    display: none;
  }
`
export const Mobile = styled.span`
  display: none;
  @media (max-width: 48em) {
    display: inline;
  }
`
export default props => {
  const mobileContent = props.list.author
    ? props.list.author.title
    : getTitleFromSlug(props.location.pathname).replace("/", "") || APP_NAME
  const desktopUserContent = props.list.author
    ? props.list.author.title
    : APP_NAME

  const cta =
    props.list.author && props.list.author.buttons
      ? props.list.author.buttons[1]
      : null
  const ctaCopy = cta
    ? (
        cta.text.charAt(0).toUpperCase() +
        cta.text.replace("Website", "website").slice(1)
      ).replace("Author", getFirstNameFromFull(props.list.author.title)) + "."
    : null
  const correctTrailingPunctuation = text => {
    const trimmedText = text
    const lastChar = trimmedText.slice(-1)
    if (text && lastChar !== "." && lastChar !== "!" && lastChar !== "?")
      return `${trimmedText}.`
    return trimmedText
  }

  const isEditableProfile =
    props.user.status === "ok" &&
    props.list.author &&
    props.user.info.id === props.list.author.id

  return (
    <ListDescriptionWrapper {...props}>
      <ListBrandName
        homepage={props.location.pathname === "/"}
        noSetWidth={mobileContent !== APP_NAME}
      >
        <Desktop>{desktopUserContent}</Desktop>
        <Mobile>{mobileContent}</Mobile>
      </ListBrandName>
      {props.user.connection.status !== "offline" ? (
        <ListHeader>
          <span>
            <em>
              {props.list.author ? (
                <React.Fragment>
                  {correctTrailingPunctuation(props.list.author.text)}
                  {cta && (
                    <React.Fragment>
                      {" "}
                      <strong
                        style={{
                          display: "inline-block",
                          fontWeight: isEditableProfile ? 400 : 700
                        }}
                      >
                        <Link to={cta.to}>{ctaCopy}</Link>
                      </strong>
                    </React.Fragment>
                  )}
                  {isEditableProfile && (
                    <React.Fragment>
                      {" "}
                      <strong>
                        <Link to="/profile/edit">Edit Profile.</Link>
                      </strong>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                props.renderedListMeta.title
              )}
            </em>
          </span>
        </ListHeader>
      ) : (
        <ListHeader>
          <em>{HEADER_ERRORS.LIST_OFFLINE.title}</em>{" "}
          {HEADER_ERRORS.LIST_OFFLINE.emoji}
        </ListHeader>
      )}
    </ListDescriptionWrapper>
  )
}
