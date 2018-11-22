import React from "react"
import styled from "styled-components"

import { GA, makeFroth } from "../../../../../utils"
import { ROUTE_URL_ARTICLES } from "../../../../constants/routes-article"
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
          <CardCaptionIntegrated>
            Our weekly email newsletter, “Analogue Reads” is{" "}
            <Link to="https://us4.campaign-archive.com/?u=256339f7eafa36f2f466aca44&id=8327655f5e">
              excellent
            </Link>
            . <Link to="/privacy-policy">No spam</Link>, no ads. The best way to
            stay in-touch.
          </CardCaptionIntegrated>
          <Subscribe
            subscribeFormCallback={props.subscribeFormCallback}
            stateOverwrite={props.subscribeForm}
            formLocation={"ArticleActions"}
          />
        </CardIntegratedForColumns>
      </div>
      {props.nextArticle &&
        props.nextArticle.slug && (
          <CardIntegratedForColumns>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title={props.nextArticle.title}
              titlePrefix="Next: "
            />
            <figure>
              <Link
                to={ROUTE_URL_ARTICLES + "/" + props.nextArticle.slug}
                onClick={() => {
                  props.nextArticleHeading(
                    preloadConstructor(props.article, props.nextArticle)
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
            </figure>
            <LinkButton
              style={{ margin: 0 }}
              to={ROUTE_URL_ARTICLES + "/" + props.nextArticle.slug}
              onClick={() => {
                props.nextArticleHeading(
                  preloadConstructor(props.article, props.nextArticle)
                )
                GA.event({
                  category: "Navigation",
                  action: "ActionsCard.next_article_button"
                })
              }}
            >
              Read Next <span>➢</span>
            </LinkButton>
          </CardIntegratedForColumns>
        )}
    </CardColumns>
  )
}
