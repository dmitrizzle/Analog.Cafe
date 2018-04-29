import { Helmet } from "react-helmet"
import React from "react"

export default props => {
  return (
    <Helmet>
      <title>{props.renderedListTitle}</title>
      <meta name="description" content={props.renderedListMeta.description} />
      <meta property="og:title" content={props.renderedListTitle} />
      <meta
        property="og:description"
        content={props.renderedListMeta.description}
      />
    </Helmet>
  )
}
