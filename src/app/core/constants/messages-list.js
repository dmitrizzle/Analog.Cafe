import { APP_DESCRIPTION } from "../../constants"

export const TEXT_LABELS = {
  pending: "In Queue",
  rejected: "Not Published",
  scheduled: "Scheduled",
  published: "Published"
}
export const META_URLS = {
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
