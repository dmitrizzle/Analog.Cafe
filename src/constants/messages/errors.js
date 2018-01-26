// constants
import emojis from "./emojis"
import { PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN } from "../picture"

export default {
  VIEW_TEMPLATE: {
    ARTICLE: {
      title: emojis.WTF,
      subtitle: "Page Not Available"
    },
    LIST: {
      title: "Nothing here yet",
      emoji: emojis.WTF
    },
    LIST_OFFLINE: {
      title: "You aren’t connected to the internet",
      emoji: emojis.WTF
    },
    SUBMISSIONS_LIST: {
      title: "You haven’t submitted anything yet",
      emoji: emojis.NEONCAT
    },
    PICTURE: {
      name: "Unknown Author",
      title: "Info not available",
      text: "This image has been authored by someone not listed in our records…"
    },
    CARD: {
      title: "Info Not Available",
      text: "This card could not be loaded…"
    },
    CARD_NO_AUTHOR_INFO: {
      text: "Author hasn’t shared any details about her- or himself yet."
    },
    SUBMISSION: {
      title: "Submission Failed",
      text:
        "Your submission did not go through. You can try sending it again, if you like."
    },
    AUTHENICATION: {
      title: "You’re Signed Out"
    },
    SUBMISSION_NO_IMAGES: {
      title: "Forgot to Add Images?",
      text: "Please include at least one photograph or illustration."
    },
    SUBMISSION_NO_CONTENT: {
      title: "Some Stuff is Missing",
      text:
        "Please make sure that you’ve added a title, text and image(s) to your submission."
    },
    UPLOAD_IMAGE_SIZE: size => {
      return {
        title: "Can’t Upload This Image",
        text: `Your image needs to be a ${PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN}, maximum ${size}MB in size. Try selecting another file.`
      }
    },
    EMAIL_LOGIN: {
      title: "Couldn’t Send Email",
      text:
        "For some reason an email with sign in link couldn’t be sent. Please try again or consider using Twitter or Facebook buttons."
    },
    EMAIL_LOGIN_TIMEOUT: remaining => {
      return {
        title: "Please Try in a Bit",
        text: `Please wait ${
          remaining > 59 ? "a minute" : remaining + " seconds" || 60
        } before requesting another login link to be sent to your email.`
      }
    },
    EMAIL_LOGIN_BAD_TOKEN: {
      title: "Couldn’t Sign In",
      text:
        "Sorry, we couldn’t sign you in. Perhaps link has expired. Try signing in with your email again."
    }
  },
  DISAMBIGUATION: {
    CODE_103: { error: "Error: User already authenticated. (103)" },
    CODE_204: { error: "Error: Malformed or no data received. (204)" },
    CODE_404: {
      error: "Error: This view or data for this view does not exist. (404)"
    },
    CODE_403: {
      error: "Error: Viewing this content requires you to sign in. (403)"
    },
    CODE_401: {
      error: "Error: You need to sign in to access your account. (401)",
      TokenExpiredError:
        "You have been automatically signed out, please sign in again. (401)",
      JsonWebTokenError:
        "You will need to sign in again should you want to submit or edit your account. (401) "
    }
  }
}
