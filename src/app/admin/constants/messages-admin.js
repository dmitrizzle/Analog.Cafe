import React from "react"

import { TEXT_EMOJIS } from "../../constants"
import Email from "../../core/components/vignettes/Email"

const NEVERMIND_BUTTON = {
  to: "#",
  text: "Nevermind",
  branded: true
}
export const CARD_DIALOGUES = {
  OVERWRITE_DRAFT: unlockFunction => {
    return {
      info: {
        title: "Warning",
        text:
          "Looks like you are currently editing another draft on this device. Do you want to overwrite it? This can not be undone.",
        buttons: [
          {
            to: "/submit/compose",
            text: "See My Current Draft",
            branded: true
          },
          {
            to: "#overwrite",
            onClick: event => unlockFunction(event, "allowOverwrite"),
            text: TEXT_EMOJIS.KEY + " Unlock"
          }
        ]
      },
      id: "hints/text-in-compsoer"
    }
  },
  REJECT: unlockFunction => {
    return {
      info: {
        title: "Are You Sure?",
        text:
          "Once you REJECT this submission the author will get an email notifying them of this event. Someone’s gonna be disappointed!",
        buttons: [
          NEVERMIND_BUTTON,
          {
            to: "#reject",
            onClick: event => unlockFunction(event, "allowReject"),
            text: TEXT_EMOJIS.KEY + " Unlock"
          }
        ]
      },
      id: "hints/reject-submission"
    }
  },
  DELETE: unlockFunction => {
    return {
      info: {
        title: "Are You Sure?",
        text: (
          <span>
            You can not undo this action. Note that published articles can not
            be deleted but can be taken down by request via <Email />
          </span>
        ),
        buttons: [
          NEVERMIND_BUTTON,
          {
            to: "#delete",
            onClick: event => unlockFunction(event, "allowDelete"),
            text: TEXT_EMOJIS.KEY + " Unlock"
          }
        ]
      },
      id: "hints/reject-submission"
    }
  },
  PUBLISH: unlockFunction => {
    return {
      info: {
        title: "Are You Sure?",
        text:
          "Please confirm that you want this article to go live. This will trigger an immediate RSS feed update which will send an update to various channels and eventually the email list. This can not be undone. You can un-publish this article later, but the message will be already out.",
        buttons: [
          NEVERMIND_BUTTON,
          {
            to: "#publish",
            onClick: event => unlockFunction(event, "allowPublish"),
            text: TEXT_EMOJIS.KEY + " Unlock"
          }
        ]
      },
      id: "hints/publish-submission"
    }
  },
  UNPUBLISH: unlockFunction => {
    return {
      info: {
        title: "Are You Sure?",
        text:
          "Please confirm that you want this article UNPUBLISHED. This will trigger an immediate RSS feed update and will affect sitemap, SEO, and create a 404 page status.",
        buttons: [
          NEVERMIND_BUTTON,
          {
            to: "#unpublish",
            onClick: event => unlockFunction(event, "allowUnpublish"),
            text: TEXT_EMOJIS.KEY + " Unlock"
          }
        ]
      },
      id: "hints/unpublish-submission"
    }
  },
  SAVE_EDITS: {
    info: {
      title: "About Edits",
      text: (
        <span>
          These edits will be applied to your submission only. Please{" "}
          {<Email />} if you would like to apply edits to a published article.
        </span>
      ),
      buttons: [
        {
          to: "/submit/confirm-full-consent",
          text: "Apply Edits",
          branded: true
        }
      ]
    },
    id: "hints/submit-editors"
  }
}
export const CARD_ALERTS = {
  REJECTED_SUCCESSFULLY: {
    info: {
      title: "Submission Rejected",
      text:
        "Done. Submission rejected. It will be marked as such in the database and the author should be receiving a notification shortly."
    },
    id: "hints/reject-submission"
  },
  DELETED_SUCCESSFULLY: {
    info: {
      title: "Submission Deleted",
      text: "Done. Submission DELETED from your account."
    },
    id: "hints/reject-submission"
  },
  UNPUBLISHED_SUCCESSFULLY: {
    info: {
      title: "Article Unpublished",
      text: "Done. Article REMOVED from publication."
    },
    id: "hints/unpublish-submission"
  },
  SCHEDULED: {
    info: {
      title: "Submission Scheduled",
      text:
        "The submission has been scheduled for the future time slot or to be published immediately. Please check the scheduling tool to confirm when it’s gonna go live."
    },
    id: "hints/publish-submission"
  }
}
