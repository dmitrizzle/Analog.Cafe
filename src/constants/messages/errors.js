import emojis from "./emojis"
export default {
  VIEW_TEMPLATE: {
    ARTICLE: {
      title: emojis.WTF,
      subtitle: "Page Not Available"
    },
    LIST: {
      title: "List not available",
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
    SUBMISSION: {
      title: "Submission Failed",
      text:
        "Your submission did not go through. You can try sending it again, if you like."
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
    UPLOAD_IMAGE_SIZE_10: {
      title: "File is Too Large!",
      text:
        "Your image needs to be 10MB or less in size. Try selecting another PNG or JPG file."
    },
    UPLOAD_IMAGE_SIZE_5: {
      title: "File is Too Large!",
      text:
        "Your image needs to be 5MB or less in size. Try selecting another PNG or JPG file."
    },
    EMAIL_LOGIN: {
      title: "Couldn’t Send Email",
      text:
        "For some reason an email with sign in link couldn’t be sent. Please try again or consider using Twitter or Facebook buttons."
    },
    EMAIL_LOGIN_TIMEOUT: {
      title: "Please Try in a Bit",
      text:
        "Please wait 20 seconds before requesting another login link to be sent to your email."
    }
  },
  DISAMBIGUATION: {
    CODE_103: { error: "Error: User already authenticated (103)" },
    CODE_204: { error: "Error: Malformed or no data received (204)" },
    CODE_404: {
      error: "Error: This view or data for this view does not exist (404)"
    },
    CODE_403: {
      error: "Error: Viewing this content requires you to sign in (403)"
    },
    CODE_401: {
      error: "Error: You need to sign in to access your account (401)",
      TokenExpiredError:
        "You have been automatically signed out, please sign in again (401)",
      JsonWebTokenError:
        "You will need to sign in again should you want to submit or edit your account (401) "
    }
  }
}
