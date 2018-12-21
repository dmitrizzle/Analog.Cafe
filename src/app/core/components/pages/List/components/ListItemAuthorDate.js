import React from "react"
import styled from "styled-components"

import { getAuthorListStringFromArray } from "../../../../utils/messages-author"
import { getHumanDatestamp } from "../../../../utils/messages-"

export const AuthorAndDate = styled.em`
  line-height: ${props => props.theme.size.block.spacing}em;
  display: block;
  & > small {
    display: inline-block;
  }
`

export const Sticker = styled.span`
  background: ${props => props.theme.color.brand()};
  color: ${props => props.theme.color.background()};
  padding: 0 0.25em;
`

export const isXWeeksAgo = date => {
  const seconds = Math.floor(new Date() / 1000 - date)
  const weeks = Math.floor(seconds / 60 / 60 / 24 / 7)
  return weeks
}

export default props => {
  return (
    <AuthorAndDate>
      {!props.private || props.isAdmin
        ? `${
            props.item.type !== "placeholder" ? "By " : ""
          }${getAuthorListStringFromArray(props.item.authors, {
            trim: true
          })} `
        : null}
      {props.item.type !== "placeholder" && (
        <React.Fragment>
          <small style={{ opacity: 0.35 }}>
            {getHumanDatestamp(props.item.date.published, true)}
          </small>{" "}
          {isXWeeksAgo(props.item.date.published) === 0 && (
            <Sticker
              className="sticker-new"
              title={getHumanDatestamp(props.item.date.published)}
            >
              <em>New!</em>
            </Sticker>
          )}
        </React.Fragment>
      )}
    </AuthorAndDate>
  )
}
