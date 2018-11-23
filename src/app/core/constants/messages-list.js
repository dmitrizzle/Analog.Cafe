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
  "/": {
    title: "Photo Essays & Film Photography",
    description: `Created by film photographers, artists, and writers of the internet. Published weekly. Maintained as an open-source project by Dmitri.`,
    designation: "homepage"
  },
  default: {
    title: APP_DESCRIPTION
  },

  "/photo-essays": {
    title: "Stories, thought pieces, art projects",
    description:
      "Emphasis on thought pieces and art projects. A collection of abstract photography, thought-provoking essays, observations, travel, culture, and items of interest."
  },
  "/film-photography": {
    title: "Cameras, chemicals, tools, reviews, guides",
    description: "Articles about film cameras, film, and everything in-between."
  },
  "/editorials": {
    title: "From the Analog.Cafe editors",
    description: ""
  },
  "/collaborations": {
    title: "Co-authored articles",
    description: ""
  },
  "/solo-projects": {
    title: "Written and photographed by a single author",
    description: ""
  },

  [ROUTE_URL_USER_LANDING]: {
    title: "Your submissions to Analog.Cafe"
  },
  "/author/*": {
    title: "Published work",
    description:
      "All published work by the Analog.Cafe author, including images and text published in collaboration with other authors."
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
