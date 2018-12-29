import React from "react"
import styled from "styled-components"

import { APP_NAME, HEADER_ERRORS } from "../../../../../constants"
import { ROUTE_API_AUTHORS } from "../../../../constants/routes-article"
import { getFirstNameFromFull } from "../../../../utils/messages-author"
import { getTitleFromSlug } from "../../../../utils/messages-"
import ListBrandName from "./ListBrandName"
import ListDescriptionWrapper from "./ListDescriptionWrapper"
import ListHeader from "./ListHeader"
import Modal from "../../../controls/Modal"

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
  return (
    <ListDescriptionWrapper {...props}>
      <ListBrandName
        homepage={props.location.pathname === "/"}
        style={{ width: mobileContent !== APP_NAME ? "12em" : "" }}
      >
        <Desktop>{desktopUserContent}</Desktop>
        <Mobile>{mobileContent}</Mobile>
      </ListBrandName>
      {props.user.connection.status !== "offline" ? (
        <ListHeader>
          <span>
            <em>
              {props.list.author
                ? props.list.author.text
                : props.renderedListMeta.title}
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
