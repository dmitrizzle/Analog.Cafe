// tools

// return
export const Paste = options => {
  const { html } = options
  return {
    onPaste(event, data, change) {
      if (data.type !== "html") return
      if (data.isShift) return
      const { document } = html.deserialize(data.html)
      change.insertFragment(document)
      return true
    }
  }
}
