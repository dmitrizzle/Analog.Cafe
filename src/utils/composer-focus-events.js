export const focusEvents = _this => {
  window.ondragover = function() {
    _this.handleDragOver()
  }
  window.ondrop = function() {
    _this.handleDragEnd()
  }

  // prevent default to allow drop
  document.addEventListener(
    "dragover",
    event => {
      event.preventDefault()
      // highlight potential drop target when the draggable element enters it
      _this.handleDragOver()
    },
    false
  )
  // cancel highlights when drag intent has finished
  document.addEventListener(
    "dragleave",
    () => {
      _this.handleDragEnd()
    },
    false
  )
  document.addEventListener(
    "drop",
    event => {
      event.preventDefault()
      _this.handleDragEnd()
    },
    false
  )
  // blur editor on Esc (remove highlights and guides for preview)
  document.addEventListener(
    "keydown",
    event => {
      if (event.keyCode === 27) {
        _this.slateEditor.blur()
      }
    },
    false
  )
}
