// tools
import keycode from "keycode"

// return
export const ToggleFeature = options => {
  const { key } = options

  return {
    onKeyDown(event, data, change) {
      const { state } = change
      if (!event.metaKey || keycode(event.which) !== key) return
      if (state.focusBlock.type !== "image") return
      event.preventDefault()

      const previousDataImmutable = state.focusBlock.data
      const previousData = {
        feature: previousDataImmutable.get("feature"),
        file: previousDataImmutable.get("file"),
        src: previousDataImmutable.get("src"),
        key: previousDataImmutable.get("key"),
        caption: previousDataImmutable.get("caption")
      }
      let featureStatus = previousData.feature ? false : true
      change.setBlock({
        type: "image",
        data: { ...previousData, feature: featureStatus }
      })
      return true
    }
  }
}
