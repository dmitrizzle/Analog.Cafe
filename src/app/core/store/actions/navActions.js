export const setView = view => {
  return {
    type: "NAV.SET_VIEW",
    payload: view
  }
}

export const setLocation = location => {
  return {
    type: "NAV.SET_LOCATION",
    payload: location
  }
}
