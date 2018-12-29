import React from "react"
import styled from "styled-components"

import { GA, makeFroth } from "../../../../../utils"
import { GetYourWeekly } from "../../../pages/Subscribe"
import { ROUTE_URL_ARTICLES } from "../../../../constants/routes-article"
import { isXWeeksAgo } from "../../../pages/List/components/ListItemAuthorDate"
import { preloadConstructor } from "../../../../utils/routes-article"
import CardCaption from "../../Card/components/CardCaption"
import CardHeader from "../../Card/components/CardHeader"
import CardIntegrated from "../../Card/components/CardIntegrated"
import Link from "../../Link"
import LinkButton from "../../Button/components/LinkButton"
import Placeholder from "../../../vignettes/Picture/components/Placeholder"
import Subscribe from "../../../../../user/components/forms/Subscribe"

export const CardColumns = styled.div`
  display: flex;
  align-items: flex-start;
  ${props => props.theme.size.breakpoint.max.m`
    display: block;
  `};
`
export const CardIntegratedForColumns = styled(CardIntegrated)`
  width: ${props => props.theme.size.breakpoint.stops.min}px;
`
export const CardCaptionIntegrated = styled(CardCaption)`
  font-size: ${props => props.theme.size.font.make.smaller}em !important;
`

export default props => {
  let readNext
  const readReceipts =
    props.user && props.user.sessionInfo
      ? props.user.sessionInfo.readReceipts
      : null
  const newArticleDate = props.list && props.list.items[0].date
  const read =
    readReceipts && newArticleDate
      ? readReceipts.filter(
          receipt =>
            receipt.articleId === props.list.items[0].id &&
            receipt.readOn > newArticleDate.published
        ).length > 0
      : null
  if (
    !read &&
    newArticleDate &&
    isXWeeksAgo(props.list.items[0].date.published) === 0 &&
    props.article.id !== props.list.items[0].id
  ) {
    readNext = {
      status: props.list.status,
      title: props.list.items[0].title,
      titlePrefix: "Just Published: ",
      cta: (
        <React.Fragment>
          Read Now <span>➢</span>
        </React.Fragment>
      ),
      slug: props.list.items[0].slug,
      poster: props.list.items[0].poster
    }
  } else {
    readNext = {
      status: props.nextArticle && props.nextArticle.slug ? "ok" : "error",
      titlePrefix: "Next: ",
      cta: (
        <React.Fragment>
          Read Next <span>➢</span>
        </React.Fragment>
      ),
      ...props.nextArticle
    }
  }
  return (
    <CardColumns
      style={{
        display:
          props.user.status !== "ok" || props.nextArticle ? undefined : "block"
      }}
    >
      <div>
        {/* {props.nextArticle && (
          <CardIntegratedForColumns>
            <CardHeader stubborn buttons={[0]} noStar title="Get Published" />
            <CardCaptionIntegrated>
              Do you shoot film? Get your work reviewed and published on
              Analog.Cafe.
            </CardCaptionIntegrated>
            <LinkButton
              branded
              to={props.userStatus === "ok" ? "/submit/compose" : "/submit"}
              onClick={() => {
                GA.event({
                  category: "Campaign",
                  action: "ActionsCard.submit_button"
                })
              }}
              key="Options_LinkButton"
            >
              Write for Analog.Cafe
            </LinkButton>
          </CardIntegratedForColumns>
        )} */}
        <CardIntegratedForColumns>
          <CardHeader stubborn buttons={[0]} noStar title="Email Newsletter" />
          <GetYourWeekly />
          <Subscribe
            subscribeFormCallback={props.subscribeFormCallback}
            stateOverwrite={props.subscribeForm}
            formLocation={"ArticleActions"}
          />
        </CardIntegratedForColumns>
      </div>
      {readNext.status === "ok" && (
        <CardIntegratedForColumns>
          <CardHeader
            stubborn
            buttons={[0]}
            noStar
            title={readNext.title}
            titlePrefix={readNext.titlePrefix}
          />
          <figure>
            <Link
              to={ROUTE_URL_ARTICLES + "/" + readNext.slug}
              onClick={() => {
                props.nextArticleHeading(
                  preloadConstructor(props.article, readNext)
                )
                GA.event({
                  category: "Navigation",
                  action: "ActionsCard.next_article_picture"
                })
              }}
            >
              <Placeholder frothId={readNext.poster}>
                <img
                  src={makeFroth({ src: readNext.poster, size: "s" }).src}
                  alt={readNext.title}
                />
              </Placeholder>
            </Link>
          </figure>
          <LinkButton
            style={{ margin: 0 }}
            to={ROUTE_URL_ARTICLES + "/" + readNext.slug}
            onClick={() => {
              props.nextArticleHeading(
                preloadConstructor(props.article, readNext)
              )
              GA.event({
                category: "Navigation",
                action: "ActionsCard.next_article_button"
              })
            }}
          >
            {readNext.cta}
          </LinkButton>
        </CardIntegratedForColumns>
      )}
    </CardColumns>
  )
}
