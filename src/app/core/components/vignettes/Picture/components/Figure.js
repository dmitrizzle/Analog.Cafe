import React from "react"

import { CARD_ERRORS } from "../../../constants/messages-"
import {
  Image,
  Figure,
  PictureCaption as Caption,
  CaptionAuthor
} from "./styles"
import Modal from "../../controls/Modal"
import { ROUTE_API_AUTHORS } from "../../../constants/routes-article"

export default props => {
  const { src, ...select } = props
  return (
    <Figure {...select}>
      <Image
        {...props}
        protected={
          props.readOnly !== false && process.env.NODE_ENV === "production"
        }
      />
      <figcaption
        style={
          props.nocaption && {
            borderBottom: "8px solid #2c2c2c",
            height: 0,
            overflow: "hidden"
          }
        }
      >
        {props.author ? (
          <Caption>
            {props.children}
            {props.readOnly ? (
              <CaptionAuthor>
                {" "}
                Image by{" "}
                <span
                  style={props.author.name === "" ? { display: "none" } : null}
                >
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
              </CaptionAuthor>
            ) : null}
          </Caption>
        ) : (
          <Caption {...props}>
            {props.children}
            {!props.noAuthor &&
              props.readOnly && (
                <CaptionAuthor> Finding image author…</CaptionAuthor>
              )}
          </Caption>
        )}
      </figcaption>
    </Figure>
  )
}
