import { MIME_PICTURES_HUMAN } from "./rules-submission"
import { TEXT_EMOJIS } from "../../constants"
import { contactInfoString } from "../../core/components/vignettes/ContactInfo"

export const CARD_ERRORS = {
  SEND: {
    title: "Submission Failed",
    text:
      "Your submission did not go through. You can try sending it again, if you like."
  },
  SEND_IMAGES_MISSING: {
    title: "Forgot to Add Images?",
    text: "Please include at least one photograph or illustration."
  },
  SEND_CONTENT_EMPTY: {
    title: "Some Stuff is Missing",
    text:
      "Please make sure that you’ve added a title, text and image(s) to your submission."
  },
  IMAGE_SIZE: size => {
    return {
      title: "Can’t Upload This Image",
      text: `Your image needs to be a ${MIME_PICTURES_HUMAN}, maximum ${size}MB in size. Try selecting another file.`
    }
  }
}

export const HEADER_ERRORS = {
  LIST: {
    title: "You haven’t submitted anything yet",
    emoji: TEXT_EMOJIS.NEONCAT
  }
}

export const TEXT_EDITORIAL_RELEASE = `All published submissions are edited for grammar and style, and, in some cases, may read differently from your submitted draft. The voice and the message should be preserved. If you’d like to approve the edits or request changes, please email ${contactInfoString}. Please also note that series (i.e. “part one of three”) are not currently accepted.`
export const CARD_DIALOGUES = {
  CONSENT: {
    info: {
      title: "Editorial Release",
      text: `${TEXT_EDITORIAL_RELEASE} Visit analog.cafe/submit/rules for complete submission rules.`,
      buttons: [
        {
          to: "/submit/confirm-full-consent",
          text: "Agree",
          branded: true
        },
        {
          to: "/submit/compose",
          text: "Cancel"
        }
      ]
    },
    id: "hints/submit-consent"
  }
}
export const CARD_ALERTS = {
  COLLABORATIONS: {
    info: {
      title: "Instant Collaboration",
      text:
        "Creating together is easy! Simply select a photo below that fits your work. You and the photographer will share the credit and may be listed in the “Collaborations” section on Analog.Cafe."
    },
    id: "hints/image-suggestions"
  },
  AUTO_SAVE: {
    info: {
      title: "Never Loose Your Work!",
      text:
        "Your text and images are saved automatically onto your device as you type. Even if you’re offline!"
    },
    id: "hints/auto-save"
  }
}
