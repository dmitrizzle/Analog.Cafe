import React from "react"

import { Button, LinkButton } from "../../../Button"
import { CardFlattened, CardCaption } from "../../styles"
import {
  FacebookLinkButton,
  InstagramLinkButton,
  TwitterLinkButton
} from "../../../Button/components/SocialButtons"
import { PicturePlaceholder } from "../../../../vignettes/Picture/components/PicturePlaceholder"
import { QuickSubscribe } from "../../../../../../user/components/forms/Subscribe"
import { ROUTE_URL_ARTICLES } from "../../../../../constants/routes-article"
import { TimeStamp } from "../../../../styles/ArticleStyles"
import { authorNameList } from "../../../../../utils/authorship"
import { datestamp, lunar, percise } from "../../../../../utils/datestamp"
import { froth } from "../../../../../utils/image-froth"
import Link from "../../../Link"

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

// return
const ActionsCard = props => {
  if (props.mode !== "follow")
    return (
      <div>
        <CardFlattened>
          <QuickSubscribe
            subscribeFormCallback={props.subscribeFormCallback}
            stateOverwrite={props.subscribeForm}
          />

          {props.shareButtons ? (
            <FacebookLinkButton
              to="https://facebook.com/analog8cafe"
              onClick={event => {
                props.shareOnFacebook(event)
                // async load Google Analytics module
                import("react-ga").then(ReactGA => {
                  ReactGA.event({
                    category: "Campaign",
                    action: "ActionsCard.share_facebook"
                  })
                })
              }}
            >
              Share&nbsp;
            </FacebookLinkButton>
          ) : null}
          {props.shareButtons ? (
            <TwitterLinkButton
              to="https://twitter.com/analog_cafe"
              onClick={event => {
                props.shareOnTwitter(event)
                // async load Google Analytics module
                import("react-ga").then(ReactGA => {
                  ReactGA.event({
                    category: "Campaign",
                    action: "ActionsCard.share_twitter"
                  })
                })
              }}
            >
              Tweet
            </TwitterLinkButton>
          ) : null}
          {!props.hideShareButtons && (
            <Button
              onClick={props.revealShareButtons}
              inverse={props.shareButtons}
            >
              Share{" "}
              <span
                style={{ transform: "rotate(90deg)", display: "inline-block" }}
              >
                ⎋
              </span>
            </Button>
          )}
        </CardFlattened>
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
                        froth({ src: props.nextArticle.poster, size: "s" }).src
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
                      {authorNameList(props.nextArticle.authors)}.
                    </span>
                  </CardCaption>
                </figcaption>
              </figure>
              <LinkButton
                style={{ margin: 0 }}
                to={ROUTE_URL_ARTICLES + "/" + props.nextArticle.slug}
                onClick={() => {
                  props.nextArticleHeading(
                    nextArticlePreload(props.nextArticle)
                  )

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
  else
    return (
      <CardFlattened>
        <TwitterLinkButton
          to="https://twitter.com/analog_cafe"
          onClick={() => {
            // async load Google Analytics module
            import("react-ga").then(ReactGA => {
              ReactGA.event({
                category: "Campaign",
                action: "ActionsCard.follow_twitter"
              })
            })
          }}
        >
          Follow on Twitter
        </TwitterLinkButton>

        <FacebookLinkButton
          to="https://facebook.com/analog8cafe"
          onClick={() => {
            // async load Google Analytics module
            import("react-ga").then(ReactGA => {
              ReactGA.event({
                category: "Campaign",
                action: "ActionsCard.follow_facebook"
              })
            })
          }}
        >
          Follow on Facebook
        </FacebookLinkButton>

        <InstagramLinkButton
          to="https://instagram.com/analog_cafe"
          onClick={() => {
            // async load Google Analytics module
            import("react-ga").then(ReactGA => {
              ReactGA.event({
                category: "Campaign",
                action: "ActionsCard.follow_instagram"
              })
            })
          }}
        >
          Follow on Instagram
        </InstagramLinkButton>
      </CardFlattened>
    )
}

const DatePublished = props => {
  if (props.thisArticlePostDate)
    return (
      <TimeStamp
        dateTime={percise(props.thisArticlePostDate)}
        itemprop="datePublished"
        title={"Published on " + datestamp(props.thisArticlePostDate) + "."}
      >
        {lunar(props.thisArticlePostDate)}
      </TimeStamp>
    )
  else if (props.thisArticlePostDate) return null
  else return null
}

export default props => {
  return (
    <div style={{ clear: "both" }}>
      <DatePublished {...props} />
      <ActionsCard {...props} />
    </div>
  )
}
