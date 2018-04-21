import React from "react"

import { AspectRatio, GridButton, GridButtonCaption } from "./styles"
import { ModalDispatch } from "../../../../core/components/controls/Modal"
import { ROUTE_AUTHOR_API } from "../../../../core/constants/author"
import { froth } from "../../../../core/utils/image-froth"

// exports
export const GridButtonImage = props => {
  return (
    <GridButton
      style={props.noShim ? { minHeight: 0 } : null}
      label={props.label}
      span={props.span}
      onClick={() =>
        props.status === "ok"
          ? props.add(props.src, props.author || null)
          : null
      }
    >
      <AspectRatio>
        <img
          src={
            froth({
              src: props.status === "ok" ? props.src : null,
              size: "t",
              crop: "square"
            }).src
          }
          alt="Editor’s suggestion"
          onDragStart={event => {
            event.preventDefault()
            event.stopPropagation()
          }}
        />
      </AspectRatio>
      {props.author && (
        <GridButtonCaption>
          <ModalDispatch
            with={{
              request: {
                url: ROUTE_AUTHOR_API + "/" + props.author.id
              }
            }}
          >
            {props.author.name}
          </ModalDispatch>
        </GridButtonCaption>
      )}
    </GridButton>
  )
}
export {
  GridContainer,
  GridRow,
  GridButton,
  GridButtonCaption,
  GridCaption,
  AspectRatio
} from "./styles"
