import React from "react"

import { GA, makeFroth } from "../../../../../utils"
import { ROUTE_URL_ARTICLES } from "../../../../constants/routes-article"
import CardHeader from "../../Card/components/CardHeader"
import CardIntegrated from "../../Card/components/CardIntegrated"
import Link from "../../Link"
import LinkButton from "../../Button/components/LinkButton"
import Placeholder from "../../../vignettes/Picture/components/Placeholder"
import Subscribe from "../../../../../user/components/forms/Subscribe"

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
      <CardIntegrated>
        {props.nextArticle &&
          props.nextArticle.slug && [
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title={props.nextArticle.title}
              titlePrefix="Next: "
              key="Options_CardHeader"
            />,
            <figure key="Options_Figure">
              <Link
                to={ROUTE_URL_ARTICLES + "/" + props.nextArticle.slug}
                onClick={() => {
                  props.nextArticleHeading(
                    nextArticlePreload(props.nextArticle)
                  )
                  GA.event({
                    category: "Navigation",
                    action: "ActionsCard.next_article_picture"
                  })
                }}
              >
                <Placeholder frothId={props.nextArticle.poster}>
                  <img
                    src={
                      makeFroth({ src: props.nextArticle.poster, size: "s" })
                        .src
                    }
                    alt={props.nextArticle.title}
                  />
                </Placeholder>
              </Link>
            </figure>,
            <LinkButton
              style={{ margin: 0 }}
              to={ROUTE_URL_ARTICLES + "/" + props.nextArticle.slug}
              onClick={() => {
                props.nextArticleHeading(nextArticlePreload(props.nextArticle))
                GA.event({
                  category: "Navigation",
                  action: "ActionsCard.next_article_button"
                })
              }}
              key="Options_LinkButton"
            >
              Read Next <span>➢</span>
            </LinkButton>
          ]}
        <Subscribe
          subscribeFormCallback={props.subscribeFormCallback}
          stateOverwrite={props.subscribeForm}
          formLocation={"ArticleActions"}
        />
      </CardIntegrated>
    </div>
  )
}
