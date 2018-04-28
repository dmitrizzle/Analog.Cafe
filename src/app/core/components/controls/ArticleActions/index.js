import React from "react"

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
import { getAuthorListStringFromArray } from "../../../../../utils/messages-author"
import {
  getHumanDatestamp,
  getISODatestamp,
  getLunarDatestamp
} from "../../../../../utils/messages-"
import { makeFroth } from "../../../../../../utils"
import Button from "../../../Button/components/Button"
import Link from "../../../Link"
import LinkButton from "../../../Button/components/LinkButton"

// return
const ActionsCard = props => {
  if (props.mode !== "follow")
    return [
      <ShareButtons key="ArticleAtions_sharebuttons" />,
      <NextArticle key="ArticleActions_nextarticle" />
    ]
  else return <FollowButtons />
}

const DatePublished = props => {
  if (props.thisArticlePostDate)
    return (
      <TimeStamp
        dateTime={getISODatestamp(props.thisArticlePostDate)}
        itemprop="datePublished"
        title={
          "Published on " + getHumanDatestamp(props.thisArticlePostDate) + "."
        }
      >
        {getLunarDatestamp(props.thisArticlePostDate)}
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
