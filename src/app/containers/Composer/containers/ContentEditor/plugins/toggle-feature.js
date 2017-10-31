// tools
import keycode from "keycode"

// return
export const ToggleFeature = options => {
  const { key } = options

  return {
    onKeyDown(event, change) {
      const { value } = change
      if (!event.metaKey || keycode(event.which) !== key) return
      if (value.focusBlock.type !== "image") return
      event.preventDefault()

      const previousDataImmutable = value.focusBlock.data
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
