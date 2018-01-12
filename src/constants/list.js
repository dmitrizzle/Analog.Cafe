// related constants
import { APP_DESCRIPTION, ROUTE_API_DOMAIN } from "./app"
import { ROUTE_AUTH_USER_LANDING } from "./user"

export { ROUTE_ARTICLE_DIR, ROUTE_SUBMISSIONS_DIR } from "./article"
export { SUMMARY_LENGTH_MAX } from "./input"

// api endpoints
export const ROUTE_LIST_API = ROUTE_API_DOMAIN + "/list"
export const ROUTE_AUTHENTICATED_LIST_API = ROUTE_API_DOMAIN + "/submissions"

// tag sets for particular view URLs/routes
export const ROUTE_TAGS = {
  "/me": "",
  "/stories": "story",
  "/editorials": "editorial",
  "/guides": "guide",
  "/reviews": "review",
  "/photo-essays": "photo-essay",
  "/articles": "review:guide:editorial:story",
  [ROUTE_AUTH_USER_LANDING]: "",
  "/": ""
}
// filtering content by composition type
export const AUTHORSHIP_FILTERS = {
  "/collaborations": "collaboration",
  "/solo-projects": "solo"
}

// meta info for filtered routes
export const ROUTE_META = {
  "/me": {
    title: "Your submissions to Analog.Cafe"
  },

  "/stories": {
    title: "Stories: any medium, any topic",
    description:
      "Stories, essays and creative writing, beyond film photography."
  },
  "/editorials": {
    title: "Notes from Analog.Cafe editors",
    description:
      "Announcements, notes and opinion pieces from Analog.Cafe editors."
  },
  "/guides": {
    title: "Guides: learn, understand & DIY",
    description:
      "Guides, explainations and instructables on film photography, art and technology."
  },
  "/reviews": {
    title: "Reviews: tools, toys & places",
    description:
      "Film photography gear, creative tools, places & experiences that inspire."
  },

  "/photo-essays": {
    title: "Photo essays; shot on film",
    description:
      "A colleciton of photo essays created with analog (film) cameras."
  },
  "/articles": {
    title: "Stories, reviews, guides & editorials",
    description:
      "A collection of articles about art, inspiration and technology."
  },

  "/collaborations": {
    title: "Collaborations",
    description:
      "Collaborations are written pieces with images created by multiple artists and photographers."
  },
  "/solo-projects": {
    title: "Solo projects",
    description:
      "Solo projects are written pieces with images created by a single author."
  },

  "/": {
    title: APP_DESCRIPTION,
    description:
      "Analog.Cafe is an inclusive creative outlet that publishes outstanding images and stories.",
    designation: "homepage"
  },
  "/author/*": {
    title: "Images & stories",
    description: "Published works and photography by Analog.Cafe author."
  },
  default: {
    title: APP_DESCRIPTION
  }
}
