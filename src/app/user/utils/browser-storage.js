import throttle from "lodash/throttle"

import { INPUT_HEADER_DEFAULTS } from "../constants/rules-submissions"

// store header data in localStorage
export const storeHeaderState = header => {
  const headerState = JSON.stringify(header)
  localStorage.setItem("composer-header-state", headerState)
}
// intermediate status before actual saves
export const saveHeader = throttle(header => storeHeaderState(header), 3000)

// load header data from localStorage
export const loadHeader = () => {
  let local = localStorage.getItem("composer-header-state")
  return local ? JSON.parse(local) : INPUT_HEADER_DEFAULTS
}
