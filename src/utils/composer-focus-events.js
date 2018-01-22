export const focusEvents = _this => {
  // prevent default to allow drop
  window.addEventListener(
    "dragover",
    event => {
      event.preventDefault()
      // highlight potential drop target when the draggable element enters it
      _this.handleDragOver()
    },
    false
  )
  document.addEventListener(
    "drop",
    event => {
      // event.preventDefault()
      _this.handleDragEnd()
    },
    false
  )

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
