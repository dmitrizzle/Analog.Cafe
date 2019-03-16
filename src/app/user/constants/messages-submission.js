import React from "react"

import { MIME_PICTURES_HUMAN } from "./rules-submission"
import { TEXT_EMOJIS } from "../../constants"
import { emailString } from "../../core/components/vignettes/Email"
import Link from "../../core/components/controls/Link"

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
    title: "⚠️ Submission Failed",
    // image:
    //   "https://res.cloudinary.com/analog-cafe/image/upload/v1528904759/image-froth_1010453_425a5704760c4879b31e008315c3047c.gif",
    text: (
      <span>
        One of these things is missing:
        <br />
        <br />
        <strong>✒︎ A title.</strong>
        <br />
        <strong>✒︎ 200-word article/essay.</strong>
        <br />
        <strong>✒︎ Image(s)</strong> <em>JPG, 10MB or less</em>.
      </span>
    )
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

export const TEXT_EDITORIAL_RELEASE = `All accepted submissions are edited for grammar and style. We aim to preserve the voice and the message of your work as much as possible, but can’t guarantee the published version will match your expectations. If you’d like to approve the edits or request changes, please email ${emailString}.`
export const CARD_DIALOGUES = {
  CONSENT: {
    info: {
      title: "Editorial Release",
      text: () => (
        <span>
          {TEXT_EDITORIAL_RELEASE} Full list of rules applied to all submissions
          is listed{" "}
          <strong>
            <Link to="/submit/rules">here</Link>
          </strong>
          .
        </span>
      ),
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
  AUTO_SAVE: {
    info: {
      title: "Never Loose Your Work!",
      text:
        "Your text and images are saved automatically onto your device as you type. Even if you’re offline! You can safely close your browser and turn off the device or computer. Just remember to use the same browser."
    },
    id: "hints/auto-save"
  }
}
