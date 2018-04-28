const nextArticlePreload = nextArticle => {
  return {
    title: nextArticle.title,
    subtitle: nextArticle.subtitle,
    authors: nextArticle.authors,
    slug: nextArticle.slug,
    poster: nextArticle.poster,
    tag: nextArticle.tag
  }
}

export default props => {
  return (
    <div>
      {props.nextArticle &&
        props.nextArticle.slug && (
          <CardFlattened>
            <figure>
              <Link
                to={ROUTE_URL_ARTICLES + "/" + props.nextArticle.slug}
                onClick={() => {
                  props.nextArticleHeading(
                    nextArticlePreload(props.nextArticle)
                  )

                  // async load Google Analytics module
                  import("react-ga").then(ReactGA => {
                    ReactGA.event({
                      category: "Navigation",
                      action: "ActionsCard.next_article_picture"
                    })
                  })
                }}
              >
                <PicturePlaceholder frothId={props.nextArticle.poster}>
                  <img
                    src={
                      makeFroth({ src: props.nextArticle.poster, size: "s" })
                        .src
                    }
                    alt={props.nextArticle.title}
                  />
                </PicturePlaceholder>
              </Link>
              <figcaption>
                <CardCaption>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.8em",
                      lineHeight: "1.5em"
                    }}
                  >
                    <span style={{ opacity: "0.5" }}>Up next:</span>{" "}
                    <q>
                      {props.nextArticle.title}
                      {props.nextArticle.subtitle
                        ? " (" + props.nextArticle.subtitle + ")"
                        : null}
                    </q>{" "}
                    – {props.nextArticle.tag.replace(/-/g, " ")} by{" "}
                    {getAuthorListStringFromArray(props.nextArticle.authors)}.
                  </span>
                </CardCaption>
              </figcaption>
            </figure>
            <LinkButton
              style={{ margin: 0 }}
              to={ROUTE_URL_ARTICLES + "/" + props.nextArticle.slug}
              onClick={() => {
                props.nextArticleHeading(nextArticlePreload(props.nextArticle))

                // async load Google Analytics module
                import("react-ga").then(ReactGA => {
                  ReactGA.event({
                    category: "Navigation",
                    action: "ActionsCard.next_article_button"
                  })
                })
              }}
            >
              Continue Reading <span>➢</span>
            </LinkButton>
          </CardFlattened>
        )}
    </div>
  )
}
