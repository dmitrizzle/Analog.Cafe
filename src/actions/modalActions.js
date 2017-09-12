// tools
import axios from "axios"
import errorMessage from "../constants/error-messages"
import { axiosRequest } from "./helpers"

// return
export const initCard = state => {
  return {
    type: "MODAL.INIT_CARD",
    payload: state
  }
}
export const hideCard = () => {
  document.getElementById("ModalOverlay").scrollTop = 0 // scroll card to top
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
        response.data.info.title && response.data.info.text
          ? dispatch(setCard(response.data, request))
          : dispatch(
              setCard(
                {
                  status: "ok",
                  info: {
                    title: errorMessage.VIEW_TEMPLATE.CARD.title,
                    text: errorMessage.VIEW_TEMPLATE.CARD.text,
                    error: errorMessage.DISAMBIGUATION.CODE_204.error
                  }
                },
                { url: "errors/modal" }
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
                    title: errorMessage.VIEW_TEMPLATE.CARD.title,
                    text: errorMessage.VIEW_TEMPLATE.CARD.text,
                    error: errorMessage.DISAMBIGUATION.CODE_401.error
                  }
                },
                { url: "errors/modal" }
              )
            )
          : dispatch(
              setCard(
                {
                  status: "ok",
                  info: {
                    title: errorMessage.VIEW_TEMPLATE.CARD.title,
                    text: errorMessage.VIEW_TEMPLATE.CARD.text,
                    error
                  }
                },
                { url: "errors/modal" }
              )
            )
      })
  }
}
