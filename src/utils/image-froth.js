// tools
import { dot } from "../app/components/_icons/components/BlankDot"

const IMAGE_FROTH_SERVER =
  "https://res.cloudinary.com/analog-cafe/image/upload/"
const IMAGE_FROTH_OPTIONS = "c_scale,fl_progressive"
const IMAGE_FROTH_SIZES = {
  t: "280",
  s: "520",
  m: "1268",
  l: "1800"
}

// image-froth_1681956_9ad677d272a84ebc9360ad6199372f8b
export const froth = (options = {}) => {
  let src = options.src || dot
  let size = options.size || "m"
  let type = options.type || "jpg"
  let crop = options.crop || "none"

  let width = IMAGE_FROTH_SIZES[size]
  let height = null
  let ratio = 0

  // extension is passed in through id:
  if (/[.]/.exec(src)) {
    type = src.split(".").pop() // log extension
    src = src.replace(/\.[^/.]+$/, "") // remove extension from file name
  }

  if (src.includes("image-froth") && !src.includes("/")) {
    if (crop === "none") {
      src =
        IMAGE_FROTH_SERVER +
        IMAGE_FROTH_OPTIONS +
        ",w_" +
        width +
        "/" +
        src +
        "." +
        type
      ratio =
        src
          .split("image-froth_")
          .pop()
          .split("_")
          .shift() / 1000000
      height = Math.round(width / ratio, 1)
    } else if (crop === "square") {
      ratio = 1
      height = width
      src =
        IMAGE_FROTH_SERVER +
        "c_fill,g_auto,w_" +
        width +
        ",h_" +
        height +
        "/" +
        src +
        "." +
        type
    }
  }
  return {
    src,
    type,
    ratio,
    width,
    height
  }
}

export const getFroth = src => {
  if (src.includes("data:image")) return "default"
  let id
  id = src
    .split("\\")
    .pop()
    .split("/")
    .pop() // get rid of domain and pathname
  id = id.replace(/\.[^/.]+$/, "") // get rid of extension
  return id
}
