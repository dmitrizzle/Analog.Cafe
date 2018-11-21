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
    title: "Photo Stories, Film Cameras & Editorials",
    description: `Written by film photographers, artists, and writers of the internet. Published weekly. Maintained as an open-source project by Dmitri.`,
    designation: "homepage"
  },
  default: {
    title: APP_DESCRIPTION
  },

  "/art": {
    title: "Thought pieces and art projects",
    description:
      "Emphasis on thought pieces and art projects. These are collections of abstract photography, thought-provoking essays, observations, and creative self-expressions."
  },
  "/places": {
    title: "Places, people, events",
    description:
      "Emphasis on places, people, events. These are the stories about travel, culture, and items of interest; meant to inform and enlighten."
  },
  "/photo-stories": {
    title: "Art, culture, travel",
    description:
      "Analog.Cafe’s Photo Stories section, split into Art and Culture topics, is a stream of non-technical essays focusing on art, culture, and travel."
  },

  "/film-cameras": {
    title: "Film cameras, chemicals, tools; reviews, stories, guides",
    description:
      "Most stories and articles on Analog.Cafe are either about film cameras or have them involved in the image making. The reason is our collective passion and appreciation for the analogue process and technology."
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
