// tools
import { Raw } from "slate"
import throttle from "lodash/throttle"

// redux
import store from "../../../../store"
import { updateStatus } from "../../../../actions/composerSaveActions"


// return
export const saveContent = throttle((document, state) => {
	const contentState = JSON.stringify(Raw.serialize(state))
	localStorage.setItem("composer-content-state", contentState)
	localStorage.setItem("composer-content-text", document.text)
	store.dispatch(updateStatus("Draft Saved"))
}, 3000)
export const saveStatus = () => store.dispatch(updateStatus("Saving&hellip;"))

export const saveHeader = throttle(header => {
	const headerState = JSON.stringify(header)
	localStorage.setItem("composer-header-state", headerState)
}, 3000)
