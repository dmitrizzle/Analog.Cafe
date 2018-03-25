// tools

// state
import { DEFAULT_COMPOSER_HEADER_STATE } from "../constants/composer"

// return
export const loadHeader = () => {
  let local = localStorage.getItem("composer-header-state")
  return local ? JSON.parse(local) : DEFAULT_COMPOSER_HEADER_STATE
}
