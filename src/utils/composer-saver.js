// tools
import throttle from "lodash/throttle"

// redux
import store from "../store"
import { setDraftStatus } from "../actions/composerActions"

// return
export const saveContent = throttle((document, state) => {
  const contentState = JSON.stringify(state.toJSON())
  localStorage.setItem("composer-content-state", contentState)
  localStorage.setItem("composer-content-text", document.text)
  // save completed status
  store.dispatch(setDraftStatus("Draft Saved"))
}, 3000)
// intermediate status before actual saves
export const setDraftStatusHelper = () =>
  store.dispatch(setDraftStatus("Saving…"))

export const saveHeader = throttle(header => {
  const headerState = JSON.stringify(header)
  localStorage.setItem("composer-header-state", headerState)
}, 3000)
