// tools
import keycode from "keycode"

import { PICTURE_DATA_OBJECT } from "../../../../../../core/constants/picture"

// return
export const ToggleFeature = options => {
  const { key } = options

  return {
    onKeyDown(event, change) {
      const { value } = change
      if (!event.metaKey || keycode(event.which) !== key) return
      if (value.focusBlock.type !== "image") return
      event.preventDefault()

      const previousData = PICTURE_DATA_OBJECT(value.focusBlock.data)
      let featureStatus = previousData.feature ? false : true
      change.setBlocks({
        type: "image",
        data: { ...previousData, feature: featureStatus }
      })
      return true
    }
  }
}
