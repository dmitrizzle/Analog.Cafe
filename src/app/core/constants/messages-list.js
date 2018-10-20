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
    title: "Photo Stories & Film Cameras",
    description: `A web magazine that publishes weekly on topics of culture, places, and film photography. Created by a community of writers and film photographers.`,
    designation: "homepage"
  },
  default: {
    title: APP_DESCRIPTION
  },

  "/perspective": {
    title: "Thought pieces and art projects",
    description: ""
  },
  "/focus": {
    title: "Places, people, events",
    description: ""
  },
  "/photo-stories": {
    title: "Art, culture, travel",
    description: ""
  },

  "/film-cameras": {
    title: "Film cameras, chemicals, tools; reviews, stories, guides",
    description: ""
  },
  "/editorials": {
    title: "From the Analog.Cafe editors",
    description: ""
  },
  "/unclassifieds": {
    title: "Everything else",
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
