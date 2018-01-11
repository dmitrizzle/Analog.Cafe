// tools

// state
import {
  DEFAULT_COMPOSER_EDITOR_STATE,
  DEFAULT_COMPOSER_HEADER_STATE
} from "../constants/composer"

// return
export const loadContent = () => {
  let local = localStorage.getItem("composer-content-state")
  return local ? JSON.parse(local) : DEFAULT_COMPOSER_EDITOR_STATE
}

export const loadTextContent = () => {
  return localStorage.getItem("composer-content-text") || ""
}

export const loadHeader = () => {
  let local = localStorage.getItem("composer-header-state")
  return local ? JSON.parse(local) : DEFAULT_COMPOSER_HEADER_STATE
}
