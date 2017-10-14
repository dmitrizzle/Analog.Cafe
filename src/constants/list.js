// related constants
import { APP_DESCRIPTION, ROUTE_API_DOMAIN } from "./app"
import emojis from "./messages/emojis"
import { ROUTE_AUTH_USER_LANDING } from "./user"

export { ROUTE_ARTICLE_DIR } from "./article"
export { SUMMARY_LENGTH_MAX } from "./input"

// api endpoints
export const ROUTE_LIST_API = ROUTE_API_DOMAIN + "/list"
export const ROUTE_AUTHENTICATED_LIST_API = ROUTE_API_DOMAIN + "/submissions"

// filter sets for particular view URLs/routes
export const ROUTE_FILTERS = {
  "/stories": "story",
  "/editorials": "editorial",
  "/guides": "guide",
  "/photo-essays": "photo-essay",
  "/articles": "review:guide:editorial:story",
  [ROUTE_AUTH_USER_LANDING]: "",
  "/": ""
}

// meta info for filtered routes
export const ROUTE_META = {
  "/stories": {
    title: "Stories",
    description: "Stories.",
    emoji: emojis.JAKE
    // #photo-essay
  },
  "/editorials": {
    title: "Editorials",
    description: "Editorials.",
    emoji: emojis.JAKE
    // #photo-essay
  },
  "/guides": {
    title: "Guides",
    description: "Guides.",
    emoji: emojis.JAKE
    // #photo-essay
  },

  "/photo-essays": {
    title: "Stories told with images on film",
    description:
      "A collection of photo essays which were created with film (analog) cameras.",
    emoji: emojis.JAKE
    // #photo-essay
  },
  "/articles": {
    title: "Reads of interest",
    description:
      "Stories, editorials, reviews, guides and other articles about art, inspiration and technology.",
    // #story
    // #editorial
    // #review
    // #guide
    emoji: emojis.MONOCLE
  },
  "/": {
    title: APP_DESCRIPTION,
    description:
      "Analog.Cafe is an inclusive creative outlet that publishes outstanding images and stories.",
    emoji: emojis.HUG_LEFT,
    designation: "homepage"
  },
  "/author/*": {
    title: "Images and stories",
    description: "Published works and photography by Analog.Cafe authors.",
    emoji: emojis.FISTBUMP_LEFT
  },
  default: {
    title: APP_DESCRIPTION,
    emoji: emojis.IDUNNO
  }
}
