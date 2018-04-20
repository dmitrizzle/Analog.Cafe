// tools
import throttle from "lodash/throttle"

// state
import { DEFAULT_COMPOSER_HEADER_STATE } from "../constants/composer"

// store header data in localStorage
export const storeHeaderState = header => {
  const headerState = JSON.stringify(header)
  localStorage.setItem("composer-header-state", headerState)
  //console.log(header.title);
}
// intermediate status before actual saves
export const saveHeader = throttle(header => storeHeaderState(header), 3000)

// load header data from localStorage
export const loadHeader = () => {
  let local = localStorage.getItem("composer-header-state")
  return local ? JSON.parse(local) : DEFAULT_COMPOSER_HEADER_STATE
}
