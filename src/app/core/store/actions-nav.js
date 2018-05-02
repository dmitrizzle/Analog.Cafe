export const setNavView = view => {
  return {
    type: "NAV.SET_VIEW",
    payload: view
  }
}
export const setNavPositions = location => {
  return {
    type: "NAV.SET_LOCATION",
    payload: location
  }
}
