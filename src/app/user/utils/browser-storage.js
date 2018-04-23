import throttle from "lodash/throttle"

// state
import { STATE_COMPOSER_HEADER_DEFAULT } from "../constants/composer"

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
  return local ? JSON.parse(local) : STATE_COMPOSER_HEADER_DEFAULT
}
