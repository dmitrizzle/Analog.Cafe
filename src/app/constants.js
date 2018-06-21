export const APP_NAME = process.env.REACT_APP_NAME
export const APP_DESCRIPTION = process.env.REACT_APP_DESCRIPTION
export const HOST_PROD = process.env.REACT_APP_DOMAIN_NAME

export const HOST_PROTOCOL = "https://"

export const HOST_API = process.env.REACT_APP_API_DOMAIN
export const HOST_RUNTIME = window.location.hostname

export const DATA_GA_ID = "UA-91374353-3"

export const DOCUMENT_BLANK_DOT =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

export const TEXT_EMOJIS = {
  WTF: "ʕ⊙ᴥ⊙ʔ",
  MONOCLE: "(╭ರ_•́)",
  NEONCAT: "(◕⌂◕⊃⊃)",
  HUG_RIGHT: "ʕっ•ᴥ•ʔっ",

  STAR: "✦",
  TITLE_SEPARATOR: "—",
  CHECKMARK: "✓",
  PARAGRAPH: "❡",

  WARNING: "⚠️",
  STOP: "❌",
  UNLOCKED: "🔓",
  LOCKED: "🔐",
  KEY: "🔑"
}

export const HEADER_ERRORS = {
  ARTICLE: {
    title: TEXT_EMOJIS.WTF,
    subtitle: "Page Not Available"
  },
  LIST: {
    title: "Nothing here yet",
    emoji: TEXT_EMOJIS.WTF
  },
  LIST_OFFLINE: {
    title: "You aren’t connected to the internet",
    emoji: TEXT_EMOJIS.WTF
  }
}

export const TEXT_ERRORS = {
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
