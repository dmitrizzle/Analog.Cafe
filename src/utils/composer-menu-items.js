// "Add Image" button functions:
export const imageButtonPosition = (value, parentOffsets, _this) => {
  const { focusBlock } = value
  if (!focusBlock) return
  if (focusBlock.type !== "paragraph") return
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
    .change()
    .insertBlock({
      type: "docket",
      isVoid: true
    })
    .value.change()
    .removeNodeByKey(activeBlockKey)
  _this.setState({
    value: resolvedState.value,
    cursorContext: { ..._this.state.cursorContext, newLine: false }
  })
}

// format menu functions:

export const menuPosition = _this => {
  const { value } = _this.state
  const menu = _this.menu
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
  const bottomOffset =
    -(rect.bottom + window.scrollY) +
    window.innerHeight -
    menu.offsetHeight -
    10
  menu.style.top = `${topOffset}px`
  menu.style.bottom = `${bottomOffset}px`
  menu.style.left = `${leftOffset >= 0 ? leftOffset : 5}px`
}

//
export const addLink = (value, returnType = "value") => {
  const href = window.prompt("Enter the URL for the link:")
  if (!href) return
  if (returnType === "value")
    return value.change().wrapInline({
      type: "link",
      data: { href }
    })
  else if (returnType === "data") return { href }
}
export const formatCommand = (type, _this) => {
  const { value } = _this.state
  let resolvedState

  switch (type) {
    case "undo_heading":
      resolvedState = value.change().setBlock({ type: "paragraph" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "make_heading":
      resolvedState = value
        .change()
        .unwrapInline("link")
        .value.change()
        .removeMark("bold")
        .value.change()
        .removeMark("italic")
        .value.change()
        .setBlock({ type: "heading" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "make_quote":
      resolvedState = value
        .change()
        .unwrapInline("link")
        .value.change()
        .removeMark("bold")
        .value.change()
        .removeMark("italic")
        .value.change()
        .setBlock({ type: "quote" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "toggle_bold":
      resolvedState = value.change().toggleMark({ type: "bold" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "toggle_italic":
      resolvedState = value.change().toggleMark({ type: "italic" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "toggle_link":
      const hasLinks = value.inlines.some(inline => inline.type === "link")
      if (hasLinks) resolvedState = value.change().unwrapInline("link")
      else resolvedState = addLink(value)
      _this.setState({
        value: resolvedState.value
      })
      break
    default:
      return false
  }
}
