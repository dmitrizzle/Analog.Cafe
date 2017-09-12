import emojis from "./emoji"
export default {
  VIEW_TEMPLATE: {
    ARTICLE: {
      title: emojis.WTF,
      subtitle: "Page Not Available"
    },
    LIST: {
      title: "List not available",
      text:
        "There are no available articles or photo essays published by this author or under this tag…",
      meta: {
        title: "List not available",
        emoji: emojis.WTF
      }
    },
    PICTURE: {
      name: "Unknown Author",
      title: "Info not available",
      text: "This image has been authored by someone not listed in our records…"
    },
    CARD: {
      title: "Info not available",
      text: "This card could not be loaded…"
    },
    SUBMISSION: {
      title: "Submission failed",
      text:
        "Your submission did not go through. You can try sending it again, if you like."
    }
  },
  DISAMBIGUATION: {
    CODE_203: { error: "Error: User already authenticated (103)" },
    CODE_204: { error: "Error: Malformed or no data received (204)" },
    CODE_404: {
      error: "Error: This view or data for this view does not exist (404)"
    },
    CODE_403: {
      error: "Error: Viewing this content requires matching log in (403)"
    },
    CODE_401: {
      error: "Error: You need to sign in to view this content (401)"
    }
  }
}
