import React from "react"

import { CardColumns } from "../../../../core/components/controls/ArticleActions/components/Options"
import { ListPageSubtitle, ListPageTitle } from "./utils"
import {
  UserDashboardHeading,
  UserProfileComposeCTA,
  UserProfileGuidedInfo,
  UserProfileImage,
  UserProfileInfo
} from "./components/SubmissionsDashboard"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import Byline from "../../../../core/components/vignettes/Byline"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import HowToSubmit from "./components/HowToSubmit"
import ListBylineNav from "./components/ListBylineNav"

export default props => {
  let view = "BASIC"
  if (props.isUserDashboard && !props.isUserFavourites) view = "USER_DASHBOARD"
  if (!props.isUserDashboard && props.isUserFavourites) view = "USER_FAVOURITES"

  return (
    <ArticleWrapper>
      <HeaderLarge
        style={{
          zIndex: 11,
          position: "relative"
        }}
        noTitleCase
        pageTitle={ListPageTitle.call({ props }, view)}
        pageSubtitle={ListPageSubtitle.call({ props }, view)}
      >
        <Byline>
          <ListBylineNav {...props} view={view} />
        </Byline>
      </HeaderLarge>

      {props.list.author && (
        <ArticleSection
          style={{
            zIndex: 11,
            position: "relative"
          }}
        >
          {props.isUserDashboard && <UserDashboardHeading {...props} />}
          <CardColumns>
            {props.profileImage && <UserProfileImage {...props} />}
            {(props.list.author.text || props.doesAuthorHaveLink) &&
              !props.isUserDashboard && <UserProfileInfo {...props} />}
            {props.isUserDashboard && <UserProfileGuidedInfo {...props} />}
          </CardColumns>
          {props.isUserDashboard && <h3>Your submissions.</h3>}
        </ArticleSection>
      )}

      {props.user.connection.status !== "offline" &&
        props.list.page["items-total"] === 0 &&
        props.me && <HowToSubmit />}

      {props.isUserDashboard && <UserProfileComposeCTA {...props} />}
    </ArticleWrapper>
  )
}
