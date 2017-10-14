// related constants
import { APP_DESCRIPTION, ROUTE_API_DOMAIN } from "./app"
import { ROUTE_AUTH_USER_LANDING } from "./user"

export { ROUTE_ARTICLE_DIR } from "./article"
export { SUMMARY_LENGTH_MAX } from "./input"

// api endpoints
export const ROUTE_LIST_API = ROUTE_API_DOMAIN + "/list"
export const ROUTE_AUTHENTICATED_LIST_API = ROUTE_API_DOMAIN + "/submissions"

// filter sets for particular view URLs/routes
export const ROUTE_FILTERS = {
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

// meta info for filtered routes
export const ROUTE_META = {
  "/me": {
    title: "Your submissions to Analog.Cafe"
  },

  "/stories": {
    title: "Stories of people & places",
    description:
      "Stories, essays and creative writing, beyond film photography."
  },
  "/editorials": {
    title: "Notes from Analog.Cafe editors",
    description:
      "Announcements, notes and opinion pieces from Analog.Cafe editors."
  },
  "/guides": {
    title: "Guides; theory & practice",
    description:
      "Guides, explainations and instructables on film photography, art and technology."
  },
  "/reviews": {
    title: "Reviews; film, cameras & more",
    description: "Film photography gear & other creative tool reviews."
  },

  "/photo-essays": {
    title: "Photo essays; shot on film",
    description:
      "A colleciton of photo essays created with analog (film) cameras."
  },
  "/articles": {
    title: "Stories, reviews guides & more",
    description:
      "Stories, editorials, reviews, guides and other articles about art, inspiration and technology."
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
