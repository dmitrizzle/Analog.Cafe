// tools
import throttle from "lodash/throttle"

// redux
import store from "../store"
import { setDraftStatus } from "../actions/composerActions"

// return
export const storeContentState = json => {
  const contentState = JSON.stringify(json)
  localStorage.setItem("composer-content-state", contentState)
}
export const storeHeaderState = header => {
  const headerState = JSON.stringify(header)
  localStorage.setItem("composer-header-state", headerState)
  //console.log(header.title);
}

export const saveContent = throttle((document, state) => {
  storeContentState(state.toJSON())
  // save text version
  localStorage.setItem("composer-content-text", state.document.text)
  // save completed status
  store.dispatch(setDraftStatus("Draft Saved"))
}, 3000)
// intermediate status before actual saves
export const setDraftStatusHelper = () =>
  store.dispatch(setDraftStatus("Saving…"))

export const saveHeader = throttle(header => storeHeaderState(header), 100)
