import React from "react"

import {
  CardColumns,
  CardIntegratedForColumns
} from "../../../../core/components/controls/ArticleActions/components/Options"
import { ROUTE_URL_USER_LANDING } from "../../../constants/routes-session"
import { TEXT_EMOJIS } from "../../../../constants"
import { makeFroth } from "../../../../utils"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import Byline from "../../../../core/components/vignettes/Byline"
import CardButton from "../../../../core/components/controls/Card/components/CardButton"
import CardCaption from "../../../../core/components/controls/Card/components/CardCaption"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import HowToSubmit from "./components/HowToSubmit"
import Link from "../../../../core/components/controls/Link"
import NavMini from "../../../../core/components/controls/Nav/components/NavMini"
import Placeholder from "../../../../core/components/vignettes/Picture/components/Placeholder"

const ProfileImage = props => (
  <figure>
    <Placeholder frothId={props.image}>
      <img
        src={
          makeFroth({
            src: props.image,
            size: "s"
          }).src
        }
        alt={props.title}
      />
    </Placeholder>
  </figure>
)

export default props => (
  <ArticleWrapper>
    <HeaderLarge
      style={{
        zIndex: 11,
        position: "relative"
      }}
      titleLinkTo={
        props.list.author ? `/is/${props.list.author.id}` : undefined
      }
      noTitleCase
      pageTitle={
        (props.list.author &&
          (props.isUserDashboard ? "⇠" : "") + props.list.author.title) ||
        "⇠"
      }
      pageSubtitle={
        !props.list.author ? "Loading…" : props.list.author.subtitle
      }
    >
      <Byline>
        {props.list.author &&
          props.user.info.id === props.list.author.id && (
            <React.Fragment>
              {props.isUserDashboard ? (
                <NavMini view="submissions" />
              ) : (
                <React.Fragment>
                  <NavMini />
                  This is how your profile looks to the general public{" "}
                  <span style={{ fontStyle: "normal" }}>🌎</span>. This page is
                  shareable.
                </React.Fragment>
              )}
            </React.Fragment>
          )}
      </Byline>
    </HeaderLarge>

    {props.list.author && (
      <ArticleSection
        style={{
          zIndex: 11,
          position: "relative"
        }}
      >
        <CardColumns>
          {props.profileImage && (
            <CardIntegratedForColumns>
              {props.isUserDashboard ? (
                <Link to={`/profile/edit`}>
                  <ProfileImage
                    image={props.profileImage}
                    title={props.list.author.title}
                  />
                </Link>
              ) : (
                <ProfileImage
                  image={props.profileImage}
                  title={props.list.author.title}
                />
              )}
            </CardIntegratedForColumns>
          )}
          {(props.list.author.text || props.doesAuthorHaveLink) && (
            <CardIntegratedForColumns>
              {props.list.author.text && (
                <figcaption style={{ fontSize: ".8em" }}>
                  <CardCaption>{props.list.author.text}</CardCaption>
                </figcaption>
              )}
              {props.doesAuthorHaveLink && (
                <CardButton to={props.list.author.buttons[1].to} branded>
                  {props.list.author.buttons[1].text}
                </CardButton>
              )}
            </CardIntegratedForColumns>
          )}
          {props.isUserDashboard &&
            (!props.list.author.text || !props.doesAuthorHaveLink) && (
              <CardIntegratedForColumns>
                <figcaption style={{ fontSize: ".8em" }}>
                  <CardCaption>
                    {props.list.author.text || (
                      <span>
                        <Link to={`/profile/edit`}>Tell the world</Link> abot
                        yourself.
                      </span>
                    )}
                  </CardCaption>
                </figcaption>

                <CardButton
                  to={
                    props.doesAuthorHaveLink
                      ? props.list.author.buttons[1].to
                      : `/profile/edit`
                  }
                  branded
                >
                  {props.doesAuthorHaveLink
                    ? props.list.author.buttons[1].text
                    : "Add a Link"}
                </CardButton>
              </CardIntegratedForColumns>
            )}
        </CardColumns>
      </ArticleSection>
    )}

    {props.user.connection.status !== "offline" &&
      props.list.page["items-total"] === 0 &&
      props.me && <HowToSubmit />}
  </ArticleWrapper>
)
