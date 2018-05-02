import React from "react"
import styled from "styled-components"

import { CARD_ERRORS } from "../../../../constants/messages-"
import { ROUTE_API_AUTHORS } from "../../../../constants/routes-article"
import Modal from "../../../controls/Modal"

const CaptionAuthor = styled.span`
  color: ${props => props.theme.color.foreground()};
  display: inline-block;
`

export default props => {
  return (
    <CaptionAuthor>
      {props.author && props.author.name ? (
        <span>
          {" "}
          Image by{" "}
          <Modal
            with={
              props.author.id !== "unknown"
                ? {
                    request: {
                      url: ROUTE_API_AUTHORS + "/" + props.author.id
                    }
                  }
                : {
                    info: {
                      title: CARD_ERRORS.PICTURE_AUTHOR.title,
                      text: CARD_ERRORS.PICTURE_AUTHOR.text,
                      error: props.author.error
                    },
                    id: "errors/author"
                  }
            }
          >
            {props.author.name}
          </Modal>.
        </span>
      ) : (
        <span>{props.children}</span>
      )}
    </CaptionAuthor>
  )
}
