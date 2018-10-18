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
    title: "Culture. Places. Film photography",
    description: `A web magazine that publishes weekly on topics of culture, places, and film photography. Created and written by a community of film photographers, artists, writers, professionals, analogue technology enthusiasts, and enterpreneurs.`,
    designation: "homepage"
  },
  default: {
    title: APP_DESCRIPTION
  },

  "/culture": {
    title: "",
    description: ""
  },
  "/places": {
    title: "",
    description: ""
  },
  "/film-photography": {
    title: "",
    description: ""
  },
  "/editorials": {
    title: "From the Analog.Cafe editors",
    description: ""
  },
  "/opinions": {
    title: "",
    description: ""
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

  [ROUTE_URL_USER_LANDING]: {
    title: "Your submissions to Analog.Cafe"
  },
  "/author/*": {
    title: "Images & stories",
    description: "Published works and photography by Analog.Cafe author."
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
