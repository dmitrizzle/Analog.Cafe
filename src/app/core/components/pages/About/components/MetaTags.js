import { Helmet } from "react-helmet"
import React from "react"

import { makeFroth } from "../../../../../utils"

export default props => {
  return (
    <Helmet>
      <title>{props.metaTitle}</title>
      <meta name="description" content={props.metaDescription} />
      <meta
        property="og:image"
        content={
          makeFroth({
            src: "image-froth_669120_c34babc2fb974c8d9f03249bea647401",
            size: "m"
          }).src
        }
      />
      <meta property="og:title" content={props.metaTitle} />
      <meta property="og:description" content={props.metaDescription} />
    </Helmet>
  )
}
