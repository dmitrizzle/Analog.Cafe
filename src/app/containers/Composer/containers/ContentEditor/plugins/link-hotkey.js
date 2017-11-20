// tools
import keycode from "keycode"
import { addLink } from "../../../../../../utils/composer-menu-items"

// return
// *first plugin* (hotkeys)
export function LinkHotkey(options) {
  const { key } = options

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, change) {
      const { value } = change

      // Check that the key pressed matches our `code` option.
      if (!event.metaKey || keycode(event.which) !== key) return

      // Prevent the default characters from being inserted.
      event.preventDefault()

      // add link to text
      const hasLinks = value.inlines.some(inline => inline.type === "link")
      if (hasLinks) {
        change.unwrapInline("link")
        return
      }
      change.wrapInline({
        type: "link",
        data: addLink(value, "data")
      })
    }
  }
}
