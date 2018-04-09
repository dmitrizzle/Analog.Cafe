// title input constants
export const TITLE_LENGTH_MAX = 52
export const TITLE_LENGTH_OPTIMAL = 24

// subtitle input constants
export const SUBTITLE_LENGTH_MAX = 75
export const SUBTITLE_LENGTH_OPTIMAL = 52

// summary input constants
export const SUMMARY_LENGTH_MAX = 250

export const INPUT_AUTO_FORMAT = value =>
  value
    .replace(/'\b/g, "‘") // opening singles
    .replace(/\b'/g, "’") // closing singles
    .replace(/"\b/g, "“") // opening doubles
    .replace(/\b"/g, "”") // closing doubles
    .replace(/ - /g, " — ") // em-dashes
    .replace(/\b\.\./g, "… ") // ellipsis
