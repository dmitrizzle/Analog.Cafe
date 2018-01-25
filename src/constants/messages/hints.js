// constants
import emijis from "./emojis"

export const MESSAGE_HINT_CHECK_EMAIL = email => {
  return {
    info: {
      title: "Email Sign In",
      text: `Please check your ${email} inbox and click the link we just sent you.`
    },
    id: "hints/check-email"
  }
}
export const MESSAGE_HINT_SUBMIT_CONSENT = {
  info: {
    title: "Open for Collaborations?",
    text:
      "If you choose “Yes” your images may appear in others’ published works on Analog.Cafe. You may also be featured in the “Collaborations” section. We’ll let you know once that happens.",
    buttons: [
      {
        to: "/submit/confirm-full-consent",
        text: "Yes",
        red: true
      },
      {
        to: "/submit/confirm-basic-consent",
        text: "No"
      }
    ]
  },
  id: "hints/submit-consent"
}
export const MESSAGE_HINT_IMAGE_COLLAB_FEATURES = {
  info: {
    title: "Instant Collaboration",
    text:
      "Creating together is easy! Simply select a photo below that fits your work. You and the photographer will share the credit and may be listed in the “Collaborations” section on Analog.Cafe."
  },
  id: "hints/image-suggestions"
}
export const MESSAGE_HINT_AUTO_SAVE = {
  info: {
    title: "Never Loose Your Work!",
    text:
      "Your text and images are saved automatically onto your device as you type. Even if you’re offline!"
  },
  id: "hints/auto-save"
}
export const MESSAGE_HINT_YOUR_PROFILE = {
  info: {
    title: "Your Profile",
    text:
      "You can create, view or update your profile after you send your submission."
  },
  id: "hints/your-profile"
}

// messages for editors:
export const MESSAGE_HINT_OVERWRITE_DRAFT = {
  info: {
    title: "Overwrite Warning",
    text:
      "Looks like you are currently editing another draft on this device. Do you want to overwrite it by editing this article instead? This can not be undone.",
    buttons: [
      {
        to: "/submit/compose",
        text: "See My Current Draft",
        red: true
      },
      {
        to: "#overwrite",
        text: "emojis.KEY Overwrite"
      }
    ]
  },
  requested: { url: "hints/text-in-compsoer" }
}
export const MESSAGE_HINT_REJECT_SUBMISSION = {
  info: {
    title: "Are You Sure?",
    text:
      "Once you reject this submission the author will get an email notifying them of this event. Someone’s gonna be disappointed!",
    buttons: [
      {
        to: "#",
        text: "Nevermind",
        red: true
      },
      {
        to: "#reject",
        text: "emojis.KEY Reject Submission"
      }
    ]
  },
  requested: { url: "hints/reject-submission" }
}
export const MESSAGE_HINT_REJECT_SUBMISSION_SUCCESS = {
  info: {
    title: "Successfuly Rejected Submission",
    text:
      "Done. Submission rejected. It will be marked as such in the database and the author should be receiving a notification shortly."
  },
  requested: { url: "hints/reject-submission" }
}
export const MESSAGE_HINT_PUBLISH_SUBMISSION = {
  info: {
    title: "Are You Sure?",
    text:
      "Please confirm that you want this article to go live. This will trigger an immediate RSS feed update which will send an update to various channels and eventually the email list. This can not be undone. You can un-publish this article later, but the message will be already out.",
    buttons: [
      {
        to: "#",
        text: "Nevermind",
        red: true
      },
      {
        to: "#publish",
        text: "emojis.KEY Publish Now"
      }
    ]
  },
  requested: { url: "hints/publish-submission" }
}
export const MESSAGE_HINT_PUBLISH_SUBMISSION_SUCCESS = {
  info: {
    title: "Submission Scheduled",
    text:
      "The submission has been scheduled for the future time slot or to be published immediately. Please check the scheduling tool to confirm when it’s gonna go live."
  },
  requested: { url: "hints/publish-submission" }
}
export const MESSAGE_HINT_SUBMIT_EDITORS = {
  info: {
    title: "Notes for Editors",
    text:
      "All image authorships and consent settings will remain as the original uploader/author has requested on submission. Article authorship will remain with original uploader. Note that if you upload a new image (which may include making edits to original images and re-uploading them) its authorship will belog to you, the editor. All new image uploads will default to “NOT open for collaborations.”",
    buttons: [
      {
        to: "/submit/confirm-basic-consent",
        text: "Apply Edits",
        red: true
      }
    ]
  },
  id: "hints/submit-editors"
}
