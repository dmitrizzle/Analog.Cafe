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
      else {
        const href = window.prompt("Enter the URL of the link:")
        if (!href) return
        resolvedState = value.change().wrapInline({
          type: "link",
          data: { href }
        })
      }
      _this.setState({
        value: resolvedState.value
      })
      break
    default:
      return false
  }
}
