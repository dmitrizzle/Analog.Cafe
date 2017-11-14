// tools
import React from "react"

// styles
import { TimeStamp } from "../../../ArticleStyles"
import { CardFlattened } from "../../styles"
import { LinkButton } from "../../../Button"
import {
  TwitterLinkButton,
  FacebookLinkButton,
  InstagramLinkButton
} from "../../../Button/components/SocialButtons"
import slugToTitle from "../../../../../utils/slug-to-title"
import { datestamp, lunar, percise } from "../../../../../utils/datestamp"

import { ROUTE_ARTICLE_DIR } from "../../../../../constants/article"

// return
const ActionsCard = props => {
  if (
    props.thisArticle !== "thank-you-for-reading-87fv" &&
    props.mode !== "follow"
  )
    return (
      <CardFlattened>
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
        {props.nextArticle && (
          <LinkButton
            to={ROUTE_ARTICLE_DIR + "/" + props.nextArticle}
            title={slugToTitle(props.nextArticle, { trim: [0, -1] })}
            onClick={() => {
              // async load Google Analytics module
              import("react-ga").then(ReactGA => {
                ReactGA.event({
                  category: "Navigation",
                  action: "ActionsCard.next_article"
                })
              })
            }}
          >
            Next Post <span>➢</span>
          </LinkButton>
        )}
      </CardFlattened>
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
