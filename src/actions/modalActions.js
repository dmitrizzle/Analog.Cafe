// tools
import axios from "axios"

// return
export function initCard(state) {
	return {
		type: "MODAL.INIT_CARD",
		payload: state,
	}
}
export function hideCard() {
	return {
		type: "MODAL.HIDE_CARD",
		payload: {},
	}
}

export function setCard(info, request) {
	return dispatch => {
		dispatch(initCard({
			requested: request,
			hidden: false,
		}))
		dispatch({
			type: "MODAL.SET_CARD",
			payload: info,
		})
	}
}
export function fetchCard(request) {
	return dispatch => {
		dispatch(initCard({
			requested: request,
			hidden: false,
		}))
		axios({
			  method: 			request.method || "get",
	      data:         request.data || {},
			  url: 					request.url + ".json",
			})
			.then(response => dispatch(setCard(response.data, request)))
			.catch(error => dispatch(setCard({
				status: "ok",
				info: {
					title: "Error " + error.response.status + " 😧",
					text: "Couldn’t load the card. Sorry!",
				}
			}, { url: "errors/modal" }))
		)
	}
}
