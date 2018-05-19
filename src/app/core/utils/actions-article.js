import {
  getAbsoluteURLPath,
  getSubmissionOrArticleRoute
} from "./routes-article"
import { getAuthorListStringFromArray } from "./messages-author"

export const shareOnFacebook = (event, props) => {
  event.preventDefault()
  window.open(
    "https://web.facebook.com/sharer.php?u=" +
      getAbsoluteURLPath(
        getSubmissionOrArticleRoute(props.history.location.pathname).pathname,
        props.article.slug
      ),
    "_blank",
    "height=600,width=500"
  )
}
export const shareOnTwitter = (event, props) => {
  event.preventDefault()
  window.open(
    "https://twitter.com/share?url=" +
      getAbsoluteURLPath(
        getSubmissionOrArticleRoute(props.history.location.pathname).pathname,
        props.article.slug
      ) +
      "&text=" +
      encodeURI(
        "“" +
          props.article.title +
          (props.article.subtitle ? " (" + props.article.subtitle + ")" : "") +
          "” by " +
          getAuthorListStringFromArray(props.article.authors)
      ) +
      "&via=analog_cafe",
    "_blank",
    "height=600,width=500"
  )
}
