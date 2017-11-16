// tools
import React from "react"
import { froth } from "../../../../../utils/image-froth"
import { PicturePlaceholder } from "../../../Picture/components/PicturePlaceholder"
import { datestamp, lunar, percise } from "../../../../../utils/datestamp"

import MailChimpPrefill from "../../../../containers/_forms/MailChimpPrefill"
import { Sidenote } from "../../../CaptionStyles"
import Link from "../../../Link"
import { ROUTE_ARTICLE_DIR } from "../../../../../constants/article"

// styles
import { TimeStamp } from "../../../ArticleStyles"
import { CardFlattened, CardCaption } from "../../styles"
import { LinkButton, Button } from "../../../Button"
import {
  TwitterLinkButton,
  FacebookLinkButton,
  InstagramLinkButton
} from "../../../Button/components/SocialButtons"

// return
const ActionsCard = props => {
  if (
    props.thisArticle !== "thank-you-for-reading-87fv" &&
    props.mode !== "follow"
  )
    return (
      <div>
        {props.subscribeForm ? (
          <Sidenote
            style={{
              textAlign: "center"
            }}
          >
            A neat summary (<Link
              onClick={() => {
                // async load Google Analytics module
                import("react-ga").then(ReactGA => {
                  ReactGA.event({
                    category: "Campaign",
                    action: "ActionsCard.subscribe_example"
                  })
                })
              }}
              to="https://us4.campaign-archive.com/?u=256339f7eafa36f2f466aca44&id=434dbe7e2b"
            >
              example
            </Link>) of the latest article(s) is sent out every Tuesday. To get
            it, fill out your email below and click “Submit{" "}
            <span style={{ fontStyle: "normal" }}>❤︎”</span> We never share or
            sell your personal information.
          </Sidenote>
        ) : null}
        <CardFlattened>
          {!props.subscribeForm ? (
            <Button
              red
              onClick={event => {
                props.revealSubscribeForm(event)

                // async load Google Analytics module
                import("react-ga").then(ReactGA => {
                  ReactGA.event({
                    category: "Campaign",
                    action: "ActionsCard.subscribe"
                  })
                })
              }}
            >
              Subscribe ❤︎
            </Button>
          ) : null}
          {props.subscribeForm ? (
            <MailChimpPrefill buttonText="Submit ❤︎" withinGroup />
          ) : null}

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
          <Button onClick={props.revealShareButtons} black={props.shareButtons}>
            Share{" "}
            <span
              style={{ transform: "rotate(90deg)", display: "inline-block" }}
            >
              ⎋
            </span>
          </Button>
        </CardFlattened>
        {props.nextArticle && (
          <CardFlattened>
            <figure>
              <Link
                to={ROUTE_ARTICLE_DIR + "/" + props.nextArticle.slug}
                onClick={() => {
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
                    – a {props.nextArticle.tag.replace(/-/g, " ")} by{" "}
                    {props.nextArticle.authorName}.
                  </span>
                </CardCaption>
              </figcaption>
            </figure>
            <LinkButton
              style={{ margin: 0 }}
              to={ROUTE_ARTICLE_DIR + "/" + props.nextArticle.slug}
              onClick={() => {
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
  if (
    props.thisArticlePostDate &&
    props.thisArticle !== "thank-you-for-reading-87fv"
  )
    return (
      <TimeStamp
        dateTime={percise(props.thisArticlePostDate)}
        itemprop="datePublished"
        title={"Published on " + datestamp(props.thisArticlePostDate) + "."}
      >
        {lunar(props.thisArticlePostDate)}
      </TimeStamp>
    )
  else if (
    props.thisArticlePostDate &&
    props.thisArticle === "thank-you-for-reading-87fv"
  )
    return null
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
