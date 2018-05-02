import React from "react"
import styled from "styled-components"

import { getAuthorListStringFromArray } from "../../../../utils/messages-author"
import { getHumanDatestamp } from "../../../../utils/messages-"

const AuthorAndDate = styled.em`
  line-height: ${props => props.theme.size.block.spacing}em;
  padding-top: calc(${props => props.theme.size.block.spacing}em / 2);
  display: inline-block;
  & > small {
    display: inline-block;
  }
`
export default props => {
  return (
    <AuthorAndDate>
      {!props.private || props.isAdmin
        ? `${getAuthorListStringFromArray(props.item.authors, {
            trim: true
          })} · `
        : null}
      {props.item.type !== "placeholder" && (
        <small>{getHumanDatestamp(props.item.date.published)}</small>
      )}
    </AuthorAndDate>
  )
}
