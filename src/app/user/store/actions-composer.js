export const setComposerHeader = value => {
  return {
    type: "COMPOSER.SET_HEADER",
    payload: value
  }
}
export const resetComposer = () => {
  return {
    type: "COMPOSER.RESET",
    payload: null
  }
}
export const setComposerSatus = status => {
  return {
    type: "COMPOSER.SET_STATUS",
    payload: status
  }
}
export const requestComposerFocus = () => {
  return {
    type: "COMPOSER.REQUEST_FOCUS"
  }
}
