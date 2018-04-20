// tools
import { froth as frothInit } from "@roast-cms/image-froth"
import { dot } from "../components/stateless/_icons/BlankDot"

const FROTH_CONSTANTS = {
  // cloudinary server and subfolder location
  server: "https://res.cloudinary.com/analog-cafe/image/upload/",
  // transformations (array) for images (kept constant)
  transformations: "c_scale,fl_progressive",
  // all sizes are image widths; heights are relative
  sizes: {
    i: "40", // icon
    t: "280", // tiny
    s: "520", // small
    m: "1268", // medium (required default)
    l: "1800" // large
  },
  // placeholder image src (in this case it's a white dot)
  placeholder: dot
}

export const froth = options => frothInit(options, FROTH_CONSTANTS)
export { getFroth } from "@roast-cms/image-froth"
