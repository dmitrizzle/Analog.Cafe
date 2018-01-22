export const focusEvents = _this => {
  window.ondragover = event => {
    event.preventDefault()
    _this.handleDragOver()
  }
  document.ondrop = event => {
    event.preventDefault()
    _this.handleDragEnd()
  }

  // blur editor on Esc (remove highlights and guides for preview)
  document.addEventListener(
    "keydown",
    event => {
      if (event.keyCode === 27 && _this.slateEditor) {
        _this.slateEditor.blur()
      }
    },
    false
  )
}
