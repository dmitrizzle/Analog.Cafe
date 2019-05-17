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

export default props => {
  // const { isNew, isNewlyEdited, read } = props;
  // console.log(props.item.title, {
  //   isNew,
  //   isNewlyEdited,
  //   read,
  //   isTrue: (props.isNew || props.isNewlyEdited) && !props.read ? 1 : 0
  // });
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
          {(props.isNew || props.isNewlyEdited) &&
            !props.read && (
              <Sticker
                inverse={props.isOldAndNewlyEdited}
                title={getHumanDatestamp(props.item.date.updated)}
              >
                <em>
                  {props.isOldAndNewlyEdited ? "Recently updated" : "New!"}
                </em>
              </Sticker>
            )}
        </React.Fragment>
      )}
    </AuthorAndDate>
  )
}
