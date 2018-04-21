import React from "react"

import { Image, Figure, Caption, CaptionAuthor } from "./styles"
import { ModalDispatch } from "../../controls/Modal"
import { ROUTE_AUTHOR_API } from "../../../constants/author"
import errorMessages from "../../../../user/constants/errors"

// return
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
                  <ModalDispatch
                    with={
                      props.author.id !== "unknown"
                        ? {
                            request: {
                              url: ROUTE_AUTHOR_API + "/" + props.author.id
                            }
                          }
                        : {
                            info: {
                              title: errorMessages.VIEW_TEMPLATE.PICTURE.title,
                              text: errorMessages.VIEW_TEMPLATE.PICTURE.text,
                              error: props.author.error
                            },
                            id: "errors/author"
                          }
                    }
                  >
                    {props.author.name}
                  </ModalDispatch>.
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
