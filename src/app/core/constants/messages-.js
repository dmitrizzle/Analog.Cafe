import { HEADER_ERRORS, TEXT_EMOJIS } from "../../constants"

export const CARD_ERRORS = {
  PICTURE_AUTHOR: {
    name: "Unknown Author",
    title: "Info not available",
    text: "This image has been authored by someone not listed in our records…"
  },
  CARD: {
    title: "Info Not Available",
    text: "This card could not be loaded…"
  },
  AUTHOR: {
    text: "Author hasn’t shared any details about her- or himself yet."
  },
  LIST: {
    title: HEADER_ERRORS.ARTICLE.subtitle,
    emoji: TEXT_EMOJIS.WTF
  }
}
export const TEXT_LABELS = {
  SUBSCRIBE: "Subscribe ❤︎",
  SEARCH: "Search… 〄",
  FIND: "Search 〄",
  SUBMIT: "Submit ❤︎"
}
