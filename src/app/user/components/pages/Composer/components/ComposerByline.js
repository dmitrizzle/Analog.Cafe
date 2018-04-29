import React from "react"

import { CARD_ALERTS } from "../../../../constants/messages-submission"
import Byline from "../../../../../core/components/vignettes/Byline"
import Link from "../../../../../core/components/controls/Link"
import Modal from "../../../../../core/components/controls/Modal"

export default props => {
  return (
    <span>
      {props.user.info.role === "admin" && props.editor.status.id ? (
        <Byline>
          Submission under edit: <strong>{props.editor.status.id}</strong>{" "}
          <Link to="#unlink" onClick={props.unlinkSubmission}>
            unlink
          </Link>.{props.editor.status.type === "published" ||
          props.editor.status.type === "scheduled"
            ? [
                <br key="Byline_linebreak" />,
                <span key="BYline_note">
                  You are editing a <strong>{props.editor.status.type}</strong>{" "}
                  article.{props.editor.status.type === "published" &&
                    " You will need to publish your changes to update the publication."}
                </span>
              ]
            : null}
        </Byline>
      ) : (
        <Byline>
          Link to <Modal with={CARD_ALERTS.YOUR_PROFILE}>Your Profile</Modal>{" "}
          will appear here.
        </Byline>
      )}
    </span>
  )
}
