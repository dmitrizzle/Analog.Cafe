import { Helmet } from "react-helmet"
import React from "react"

import { makeFroth } from "../../../../utils"

export default props => {
  return (
    <Helmet>
      {props.metaTitle && <title>{props.metaTitle}</title>}
      {props.metaTitle && (
        <meta property="og:title" content={props.metaTitle} />
      )}
      {props.metaDescription && (
        <meta name="description" content={props.metaDescription} />
      )}
      {props.metaDescription && (
        <meta property="og:description" content={props.metaDescription} />
      )}
      {props.metaImage && (
        <meta
          property="og:image"
          content={makeFroth({ src: props.metaImage, size: "m" }).src}
        />
      )}
    </Helmet>
  )
}
