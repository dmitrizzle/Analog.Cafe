handleShareOnFacebook = event => {
  event.preventDefault()
  window.open(
    "https://web.facebook.com/sharer.php?u=" +
      getAbsoluteURLPath(
        getSubmissionOrArticleRoute(this.props.history.location.pathname)
          .pathname,
        this.props.article.slug
      ),
    "_blank",
    "height=600,width=500"
  )
}
handleShareOnTwitter = event => {
  event.preventDefault()
  window.open(
    "https://twitter.com/share?url=" +
      getAbsoluteURLPath(
        getSubmissionOrArticleRoute(this.props.history.location.pathname)
          .pathname,
        this.props.article.slug
      ) +
      "&text=" +
      encodeURI(
        "“" +
          this.props.article.title +
          (this.props.article.subtitle
            ? " (" + this.props.article.subtitle + ")"
            : "") +
          "” by " +
          getAuthorListStringFromArray(this.props.article.authors)
      ) +
      "&via=analog_cafe",
    "_blank",
    "height=600,width=500"
  )
}
