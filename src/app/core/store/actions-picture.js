import { getFroth } from "@roast-cms/image-froth"
import axios from "axios"

import { CARD_ERRORS } from "../constants/messages-"
import { GA, makeAPIRequest } from "../../utils"
import { ROUTE_API_AUTHORS } from "../constants/routes-article"
import { ROUTE_API_IMAGES } from "../../user/constants/routes-submission"
import { TEXT_ERRORS } from "../../constants"
import { getFirstNameFromFull } from "../utils/messages-author"
import { setModal } from "./actions-modal"

const UNKNOWN_AUTHOR = (id, error) => {
  return {
    type: "PICTURE.GET_INFO",
    payload: {
      info: {
        author: {
          name: CARD_ERRORS.PICTURE_AUTHOR.name,
          id: "unknown",
          error:
            !error.response || !error.response.status
              ? TEXT_ERRORS.CODE_204.error
              : error
        }
      },
      status: "fail",
      id
    }
  }
}
export const getPictureInfo = src => {
  let id = getFroth(src)
  let request
  request = {
    url: ROUTE_API_IMAGES + "/" + id
  }
  return (dispatch, getState) => {
    let picturesState = getState().picture
    if (picturesState[id]) return
    axios(makeAPIRequest(request))
      .then(response => {
        if (response.data.status === "ok") {
          const { author } = response.data.info
          const authorLinkButton = {
            to: `/is/${author.id}`,
            text: `Image by [${getFirstNameFromFull(author.name)}]`,
            inverse: true,
            onClick: () => {
              GA.event({
                category: "Navigation",
                action: "Picture.author_profile",
                label: src
              })
            }
          }

          // add author's chosen link button
          if (author.id) {
            let request = {
              url: ROUTE_API_AUTHORS + "/" + author.id
            }
            axios(makeAPIRequest(request)).then(response => {
              const authorCTA =
                response.data.status === "ok" && response.data.info.buttons[1]
                  ? {
                      to: response.data.info.buttons[1].to,
                      text: response.data.info.buttons[1].text
                        .replace("Me", "Author")
                        .replace("My", "Author’s"),
                      onClick: () => {
                        GA.event({
                          category: "Campaign",
                          action: "Picture.author_cta"
                        })
                      }
                    }
                  : {
                      to: "",
                      text: ""
                    }

              dispatch(
                setModal(
                  {
                    info: {
                      image: src,
                      buttons: [authorLinkButton, authorCTA],
                      headless: true
                    },
                    status: response.data.status,
                    id
                  },
                  {
                    url: "hints/image-author"
                  }
                )
              )
            })
          } else
            dispatch(
              setModal(
                {
                  info: {
                    image: src,
                    buttons: [authorLinkButton],
                    headless: true
                  },
                  status: response.data.status,
                  id
                },
                {
                  url: "hints/image-author"
                }
              )
            )
        } else dispatch(UNKNOWN_AUTHOR(id))
      })
      .catch(error => dispatch(UNKNOWN_AUTHOR(id, error)))
  }
}
