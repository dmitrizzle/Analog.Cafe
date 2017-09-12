// tools
import axios from "axios"
import { setCard } from "./modalActions"
import errorMessage from "../constants/error-messages"
import { ROUTE_USER_API } from "../constants/user"

// get user data matched to login credentials
export const getUser = token => {
  return dispatch => {
    axios({
      method: "get",
      headers: {
        Authorization: "JWT " + token
      },
      url: ROUTE_USER_API
    })
      .then(response =>
        dispatch({
          type: "USER.GET_USER",
          payload: response.data
        })
      )
      .catch(error =>
        dispatch(
          setCard(
            {
              status: "ok",
              info: {
                title: errorMessage.VIEW_TEMPLATE.CARD.title,
                text: errorMessage.DISAMBIGUATION.CODE_401.error
              }
            },
            { url: "errors/user" }
          )
        )
      )
  }
}

// set user routes, notably redirect after login url
export const setRoutes = routes => {
  return {
    type: "USER.SET_ROUTES",
    payload: routes
  }
}
export const resetRoutes = () => {
  return {
    type: "USER.RESET_ROUTES"
  }
}
