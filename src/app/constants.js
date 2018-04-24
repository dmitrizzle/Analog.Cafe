export const APP_NAME = process.env.REACT_APP_NAME
export const APP_DESCRIPTION = process.env.REACT_APP_DESCRIPTION
export const HOST_PROD = process.env.REACT_APP_DOMAIN_NAME

export const HOST_PROTOCOL = "https://"

export const HOST_API = process.env.REACT_APP_API_DOMAIN
export const HOST_RUNTIME = window.location.hostname

export const DATA_GA_ID = "UA-91374353-3"

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
  LOCKED: "🔓",
  UNLOCKED: "🔐",
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
