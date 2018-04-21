// tools
import axios from "axios"

import { axiosRequest } from "../../utils/axios-request"
import errorMessages from "../../../user/constants/errors"
// return
export const initCard = state => {
  return {
    type: "MODAL.INIT_CARD",
    payload: state
  }
}
export const hideCard = () => {
  document.getElementById("modal-overlay").scrollTop = 0 // scroll card to top
  return {
    type: "MODAL.HIDE_CARD",
    payload: {}
  }
}

export const setCard = (info, request) => {
  return dispatch => {
    dispatch(
      initCard({
        requested: request,
        hidden: false
      })
    )
    dispatch({
      type: "MODAL.SET_CARD",
      payload: info
    })
  }
}
export const fetchCard = request => {
  return dispatch => {
    dispatch(
      initCard({
        requested: request,
        hidden: false
      })
    )
    axios(axiosRequest(request))
      .then(response => {
        // every card should have a title and text body or an image
        // if it's an author's card it could be blank though
        if (
          response.data.info.title &&
          (response.data.info.text ||
            response.data.info.image ||
            response.data.info.role)
        ) {
          if (
            !response.data.info.text &&
            !response.data.info.image &&
            response.data.info.role
          )
            response.data.info.text =
              errorMessages.VIEW_TEMPLATE.CARD_NO_AUTHOR_INFO.text
          dispatch(setCard(response.data, request))
        } else
          dispatch(
            setCard(
              {
                status: "ok",
                info: {
                  title: errorMessages.VIEW_TEMPLATE.CARD.title,
                  text: errorMessages.VIEW_TEMPLATE.CARD.text,
                  error: errorMessages.DISAMBIGUATION.CODE_204.error
                }
              },
              { url: "errors/card" }
            )
          )
      })
      .catch(error => {
        error.response && error.response.status && error.response.status === 401
          ? dispatch(
              setCard(
                {
                  status: "ok",
                  info: {
                    title: errorMessages.VIEW_TEMPLATE.CARD.title,
                    text: errorMessages.VIEW_TEMPLATE.CARD.text,
                    error: errorMessages.DISAMBIGUATION.CODE_401.error
                  }
                },
                { url: "errors/card" }
              )
            )
          : dispatch(
              setCard(
                {
                  status: "ok",
                  info: {
                    title: errorMessages.VIEW_TEMPLATE.CARD.title,
                    text: errorMessages.VIEW_TEMPLATE.CARD.text,
                    error
                  }
                },
                { url: "errors/card" }
              )
            )
      })
  }
}
