// tools
import throttle from "lodash/throttle"

// return
export const storeHeaderState = header => {
  const headerState = JSON.stringify(header)
  localStorage.setItem("composer-header-state", headerState)
  //console.log(header.title);
}

// intermediate status before actual saves
export const saveHeader = throttle(header => storeHeaderState(header), 3000)
