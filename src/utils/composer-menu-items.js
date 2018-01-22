// tools
import { fixHangingSelection } from "./HACKS"

// "Add Image" button functions:
export const imageButtonPosition = (value, parentOffsets, _this) => {
  const { focusBlock } = value
  if (!focusBlock) return
  if (focusBlock.type !== "paragraph" && focusBlock.type !== "heading") return
  const cursorContext = {
    firstEmptyLine: value.document.isEmpty && value.document.nodes.size === 1,
    newLine: value.focusBlock.isEmpty,
    parentBlockOffsets: parentOffsets,
    isFocused: _this.state.cursorContext.isFocused
  }
  _this.setState({ cursorContext })
}

export const handleImageButton = (event, _this) => {
  if (!event) return
  event.preventDefault()
  event.stopPropagation()

  const activeBlockKey = _this.state.value.focusBlock.key
  const resolvedState = _this.state.value
    .change({ save: false })
    .insertBlock({
      type: "docket",
      isVoid: true
    })
    .value.change({ save: false })
    .removeNodeByKey(activeBlockKey)
  _this.setState({
    value: resolvedState.value,
    cursorContext: { ..._this.state.cursorContext, newLine: false }
  })
}

// format menu functions:

export const menuPosition = (_this, value) => {
  const menu = _this.menu

  fixHangingSelection(_this, value.change())

  if (!menu) return
  if (window.getSelection().rangeCount <= 0) return
  const selection = window.getSelection()
  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()
  if (value.isBlurred || value.isEmpty) {
    menu.style.display = ""
    return
  }
  menu.style.display = "block"
  const leftOffset =
    rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2
  const topOffset = rect.top + window.scrollY - menu.offsetHeight + 3
  menu.style.top = `${topOffset}px`
  menu.style.left = `${leftOffset >= 0 ? leftOffset : 5}px`

  // devices with touch screens will have edit menu considerably above the
  // selected text to give way to the native hover menu
  "ontouchstart" in document.documentElement
    ? menu.classList.add("touch")
    : menu.classList.remove("touch")
}

//
export const addLink = (value, returnType = "value") => {
  const href = window.prompt("Enter the URL for the link:")

  if (returnType === "value") {
    if (!href) return value.change().unwrapInline("link")
    return value.change().wrapInline({
      type: "link",
      data: { href }
    })
  } else if (returnType === "data") return { href }
}

export const formatCommand = (type, value, store) => {
  switch (type) {
    case "undo_heading":
      store(value.change().setBlock({ type: "paragraph" }).value)
      break
    case "make_heading":
      store(
        value
          .change()
          .unwrapInline("link")
          .value.change()
          .removeMark("bold")
          .value.change()
          .removeMark("italic")
          .value.change()
          .setBlock({ type: "heading" }).value
      )
      break
    case "make_quote":
      store(
        value
          .change()
          .unwrapInline("link")
          .value.change()
          .removeMark("bold")
          .value.change()
          .removeMark("italic")
          .value.change()
          .setBlock({ type: "quote" }).value
      )
      break
    case "toggle_bold":
      store(value.change().toggleMark({ type: "bold" }).value)
      break
    case "toggle_italic":
      store(value.change().toggleMark({ type: "italic" }).value)
      break
    case "toggle_link":
      const hasLinks = value.inlines.some(inline => inline.type === "link")
      if (hasLinks) store(value.change().unwrapInline("link").value)
      else store(addLink(value).value)
      break
    default:
      return false
  }
}
