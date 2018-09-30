import { APP_DESCRIPTION } from "../../constants"
import { ROUTE_URL_USER_LANDING } from "../../user/constants/routes-session"

export const TEXT_STATUS_LABELS = {
  pending: "In Queue",
  rejected: "Not Published",
  unpublished: "Unpublished",
  scheduled: "Scheduled",
  published: "Published"
}
export const TEXT_ROUTE_LABELS = {
  [ROUTE_URL_USER_LANDING]: {
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

export const LIST_PLACEHOLDER = [
  {
    type: "placeholder",
    tag: "████████",
    title: "███",
    id: "0000000",
    author: {
      name: "██████"
    },
    summary: "█ ████████ ██████ ████ ████ ██████████ ████ ████████████████ ██"
  },
  {
    type: "placeholder",
    tag: "████",
    title: "████",
    id: "0000001",
    author: {
      name: "█████"
    },
    summary: "█████ ████████████ ████████ ███ ███████████ ██████████████████"
  },
  {
    type: "placeholder",
    tag: "█████████",
    title: "██",
    id: "0000002",
    author: {
      name: "██"
    },
    summary: "█ ██████████ ██████ ██████ ███████████ ███ ███████████ █████████"
  }
]
