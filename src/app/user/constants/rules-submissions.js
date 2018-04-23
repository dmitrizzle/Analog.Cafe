export const INPUT_TITLE_LIMIT = 52
export const INPUT_TITLE_WARNING = 24
export const INPUT_SUBTITLE_LIMIT = 75
export const INPUT_SUBTITLE_WARNING = INPUT_TITLE_LIMIT
export const INPUT_SUMMARY_LIMIT = 250

export const INPUT_FORMAT = value =>
  value
    .replace(/'\b/g, "‘")
    .replace(/\b'/g, "’")
    .replace(/"\b/g, "“")
    .replace(/\b"/g, "”")
    .replace(/ - /g, " — ")
    .replace(/\b\.\./g, "… ")
export const INPUT_HEADER_DEFAULTS = { title: "", subtitle: "" }

export const MIME_PICTURES = ["image/png", "image/jpeg"]
export const MIME_PICTURES_HUMAN = "PNG or JPEG"

export const OBJECT_SLATE_PICTURE_FROM_IMMUTABLE = previousDataImmutable => {
  if (!previousDataImmutable) return undefined
  const previousData = {
    feature: previousDataImmutable.get("feature"),
    file: previousDataImmutable.get("file"),
    src: previousDataImmutable.get("src"),
    key: previousDataImmutable.get("key"),
    caption: previousDataImmutable.get("caption")
  }
  return previousData
}
