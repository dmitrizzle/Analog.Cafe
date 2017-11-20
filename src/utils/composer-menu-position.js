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
