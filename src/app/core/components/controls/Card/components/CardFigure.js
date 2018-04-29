import React from "react"

import { PicturePlaceholder } from "../../../vignettes/Picture/components/PicturePlaceholder"
import { makeFroth } from "../../../../../utils"
import CardCaption from "./CardCaption"

export default props => {
  return (
    <figure onClick={event => event.stopPropagation()}>
      <PicturePlaceholder frothId={props.image}>
        <img src={makeFroth({ src: props.image, size: "s" }).src} alt="Card" />
      </PicturePlaceholder>
      <figcaption>
        <CardCaption
          style={{ padding: typeof props.text === "undefined" ? "0" : "" }}
        >
          {props.text}
        </CardCaption>
      </figcaption>
    </figure>
  )
}
