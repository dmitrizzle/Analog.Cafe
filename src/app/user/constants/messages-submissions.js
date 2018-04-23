import { EMOJI } from "../../constants"
import { MIME_PICTURES_HUMAN } from "../../core/constants/picture"

export const CARD_ERRORS = {
  LIST: {
    title: "You haven’t submitted anything yet",
    emoji: EMOJI.NEONCAT
  },
  SEND: {
    title: "Submission Failed",
    text:
      "Your submission did not go through. You can try sending it again, if you like."
  },
  AUTHENICATION: {
    title: "You’re Signed Out"
  },
  SEND_CONTENT_REQUIRED: {
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
export const CARD_DIALOGUES = {
  CONSENT: {
    info: {
      title: "Open for Collaborations?",
      text:
        "If you choose “Yes” your images may appear in others’ published works on Analog.Cafe. You may also be featured in the “Collaborations” section. We’ll let you know once that happens.",
      buttons: [
        {
          to: "/submit/confirm-full-consent",
          text: "Yes",
          branded: true
        },
        {
          to: "/submit/confirm-basic-consent",
          text: "No"
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
  },
  YOUR_PROFILE: {
    info: {
      title: "Your Profile",
      text:
        "You can create, view or update your profile after you send your submission."
    },
    id: "hints/your-profile"
  }
}
