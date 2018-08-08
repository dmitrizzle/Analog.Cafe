import { Helmet } from "react-helmet"
import React from "react"

import { HOST_PROD, HOST_PROTOCOL } from "../../../../constants"
import { ROUTE_URL_ARTICLES } from "../../../constants/routes-article"
import { getISODatestamp } from "../../../utils/messages-"
import { getLeadAuthorObject } from "../../../utils/messages-author"
import { makeFroth } from "../../../../utils"

export default props => {
  const image = makeFroth({ src: props.metaImage, size: "m" }).src
  const schema = {
    type: "application/ld+json",
    innerHTML: JSON.stringify({
      "@context": "http://schema.org",
      "@type": "Article",
      mainEntityOfPage: props.metaSlug
        ? {
            "@type": "WebPage",
            "@id": `${ROUTE_URL_ARTICLES}/${props.metaSlug}`
          }
        : undefined,
      image: image
        ? {
            "@type": "ImageObject",
            url: image
          }
        : undefined,
      headline: props.metaTitle ? props.metaTitle : undefined,
      publisher: {
        "@type": "Organization",
        name: "Analog.Cafe",
        logo: {
          "@type": "ImageObject",
          url: `${HOST_PROTOCOL + HOST_PROD}/icon-512x512.png`,
          width: "512",
          height: "512"
        }
      },
      author:
        props.metaAuthors && props.metaAuthors[0].name
          ? {
              "@type": "Person",
              name: getLeadAuthorObject(props.metaAuthors).name
            }
          : undefined,
      datePublished: props.metaPostDate
        ? getISODatestamp(props.metaPostDate)
        : undefined,
      dateModified: props.metaEditDate
        ? getISODatestamp(props.metaEditDate)
        : props.metaPostDate
          ? props.metaPostDate
          : undefined
    })
  }

  return (
    <Helmet {...(props.metaArticleSchema ? { script: [schema] } : {})}>
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
