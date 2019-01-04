import React from "react"

import { ROUTE_URL_USER_LANDING } from "../../../../constants/routes-session"
import Byline from "../../../../../core/components/vignettes/Byline"
import Link from "../../../../../core/components/controls/Link"

export default props => {
  return (
    <span>
      {props.user.info.role === "admin" && props.editor.status.id ? (
        <Byline>
          Submission under edit: <strong>{props.editor.status.id}</strong>{" "}
          <Link to="#unlink" onClick={props.unlinkSubmission}>
            unlink
          </Link>
          .
          {props.editor.status.type === "published" ||
          props.editor.status.type === "scheduled"
            ? [
                <br key="Byline_linebreak" />,
                <span key="BYline_note">
                  You are editing a <strong>{props.editor.status.type}</strong>{" "}
                  article.
                  {props.editor.status.type === "published" &&
                    " You will need to publish your changes to update the magazine."}
                </span>
              ]
            : null}
        </Byline>
      ) : props.user.status === "ok" ? (
        <Byline>
          <Link to={`${ROUTE_URL_USER_LANDING}/edit?return=/submit/compose`}>
            Edit
          </Link>{" "}
          your profile.
        </Byline>
      ) : (
        <Byline>
          <Link to="/sign-in">Sign in</Link> to edit your profile.
        </Byline>
      )}
    </span>
  )
}
