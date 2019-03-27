import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"

import { CardIntegratedForColumns } from "../../../../../core/components/controls/ArticleActions/components/Options"
import { makeFroth } from "../../../../../utils"
import CardButton from "../../../../../core/components/controls/Card/components/CardButton"
import CardCaption from "../../../../../core/components/controls/Card/components/CardCaption"
import Link from "../../../../../core/components/controls/Link"
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton"
import Placeholder from "../../../../../core/components/vignettes/Picture/components/Placeholder"

// export const UserDashboardHeading = props => (
//   <React.Fragment>
//     <h3 style={{ display: "inline-block" }}>Your author profile.&nbsp;</h3>
//     <em>
//       <Link to={`/profile/edit`}>Edit</Link> &{" "}
//       <Link to={`/is/${props.list.author.id}`}>view</Link>.
//     </em>
//   </React.Fragment>
// )

export const ProfileImage = props => (
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

export const UserProfileImage = props => (
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
)

export const UserProfileInfo = props => (
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
)

export const UserProfileGuidedInfo = props => (
  <CardIntegratedForColumns
    style={{
      boxShadow: "none",
      overflow: "visible",
      background: "transparent"
    }}
  >
    <figcaption
      style={{
        fontSize: ".8em",
        boxShadow: "0 0 0 1px rgba(44,44,44,0.125)",
        borderTopLeftRadius: ".25em",
        borderTopRightRadius: ".25em",
        background: "#fff"
      }}
    >
      <CardCaption>
        {props.list.author.text || (
          <span>
            <Link to={`/profile/edit`}>Tell us</Link> a little abot yourself.
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
      branded={!props.isUserDashboard}
      style={{
        borderBottomLeftRadius: ".25em",
        borderBottomRightRadius: ".25em"
      }}
    >
      {props.doesAuthorHaveLink
        ? props.list.author.buttons[1].text
        : "Add a Link"}
    </CardButton>

    {props.isUserDashboard && (
      <React.Fragment>
        {props.list.page["items-total"] === 0 && (
          <p>
            <Link to="/submit">
              <strong>Learn more</strong>
            </Link>{" "}
            about submitting articles, essays, and photography.
          </p>
        )}
      </React.Fragment>
    )}
  </CardIntegratedForColumns>
)

export const UserProfileComposeCTA = props => (
  <div style={{ zIndex: 10, position: "relative" }}>
    <LinkButton to="/submit/compose" branded>
      {loadTextContent().length > 0
        ? "✏︎ Edit Submission Draft"
        : "✏︎ Compose New Submission"}
    </LinkButton>
    <small style={{ textAlign: "center", display: "block" }}>
      <Link to="/submit/restore">Restore</Link> previous submission.
    </small>
    <span style={{ textAlign: "center", display: "block" }}>
      View your public portfoio{" "}
      <strong>
        <Link to={`/is/${props.user.info.id}`}>here</Link>
      </strong>
      .
    </span>
  </div>
)
