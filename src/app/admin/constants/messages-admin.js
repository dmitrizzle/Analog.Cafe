import { TEXT_EMOJIS } from "../../constants"

export const CARD_DIALOGUES = {
  OVERWRITE_DRAFT: {
    info: {
      title: "Overwrite Warning",
      text:
        "Looks like you are currently editing another draft on this device. Do you want to overwrite it by editing this article instead? This can not be undone.",
      buttons: [
        {
          to: "/submit/compose",
          text: "See My Current Draft",
          branded: true
        },
        {
          to: "#overwrite",
          text: TEXT_EMOJIS.KEY + " Overwrite"
        }
      ]
    },
    requested: { url: "hints/text-in-compsoer" }
  },
  REJECT: {
    info: {
      title: "Are You Sure?",
      text:
        "Once you reject this submission the author will get an email notifying them of this event. Someone’s gonna be disappointed!",
      buttons: [
        {
          to: "#",
          text: "Nevermind",
          branded: true
        },
        {
          to: "#reject",
          text: TEXT_EMOJIS.KEY + " Reject Submission"
        }
      ]
    },
    requested: { url: "hints/reject-submission" }
  },
  PUBLISH: {
    info: {
      title: "Are You Sure?",
      text:
        "Please confirm that you want this article to go live. This will trigger an immediate RSS feed update which will send an update to various channels and eventually the email list. This can not be undone. You can un-publish this article later, but the message will be already out.",
      buttons: [
        {
          to: "#",
          text: "Nevermind",
          branded: true
        },
        {
          to: "#publish",
          text: TEXT_EMOJIS.KEY + " Publish Now"
        }
      ]
    },
    requested: { url: "hints/publish-submission" }
  },
  SAVE_EDITS: {
    info: {
      title: "Notes for Editors",
      text:
        "All image authorships and consent settings will remain as the original uploader/author has requested on submission. Article authorship will remain with original uploader. Note that if you upload a new image (which may include making edits to original images and re-uploading them) its authorship will belog to you, the editor. All new image uploads will default to “NOT open for collaborations.”",
      buttons: [
        {
          to: "/submit/confirm-basic-consent",
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
      title: "Successfuly Rejected Submission",
      text:
        "Done. Submission rejected. It will be marked as such in the database and the author should be receiving a notification shortly."
    },
    requested: { url: "hints/reject-submission" }
  },
  SCHEDULED: {
    info: {
      title: "Submission Scheduled",
      text:
        "The submission has been scheduled for the future time slot or to be published immediately. Please check the scheduling tool to confirm when it’s gonna go live."
    },
    requested: { url: "hints/publish-submission" }
  }
}
