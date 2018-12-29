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
  background: ${props =>
    props.inverse ? props.theme.color.foreground() : props.theme.color.brand()};
  color: ${props => props.theme.color.background()};
  padding: 0.25em;
  display: inline-block;
  margin-top: 0.25em;
  font-size: ${props => props.theme.size.font.make.smaller}em;
`

export const isXWeeksAgo = date => {
  const seconds = Math.floor(new Date() / 1000 - date)
  const weeks = Math.floor(seconds / 60 / 60 / 24 / 7)
  return weeks
}

export default props => {
  const isNew =
    props.item.type !== "placeholder"
      ? isXWeeksAgo(props.item.date.published) === 0
      : null
  const isNewlyEdited =
    props.item.type !== "placeholder"
      ? isXWeeksAgo(props.item.date.updated) === 0
      : null
  const read = props.readReceipts
    ? props.readReceipts.filter(
        receipt =>
          receipt.articleId === props.item.id &&
          receipt.readOn > props.item.date.updated
      ).length > 0
    : null

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
          {(isNew || isNewlyEdited) &&
            !read && (
              <Sticker
                inverse={
                  isXWeeksAgo(props.item.date.published) > 0 &&
                  props.item.date.published < props.item.date.updated
                }
                title={getHumanDatestamp(props.item.date.updated)}
              >
                <em>
                  {isXWeeksAgo(props.item.date.published) > 0 &&
                  props.item.date.published < props.item.date.updated
                    ? "Recently updated"
                    : "New!"}
                </em>
              </Sticker>
            )}
        </React.Fragment>
      )}
    </AuthorAndDate>
  )
}
