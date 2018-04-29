import { Helmet } from "react-helmet"
import React from "react"

import { makeFroth } from "../../../../../utils"

export default props => {
  return (
    <Helmet>
      <title>{props.article.title}</title>
      <meta name="description" content={props.article.summary} />
      <meta property="og:title" content={props.article.title} />
      <meta property="og:description" content={props.article.summary} />
      {props.article.poster && (
        <meta
          property="og:image"
          content={makeFroth({ src: props.article.poster, size: "m" }).src}
        />
      )}
    </Helmet>
  )
}
