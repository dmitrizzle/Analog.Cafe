import { froth as frothInit } from "@roast-cms/image-froth"
import { dot } from "../components/icons/BlankDot"

const FROTH_CONSTANTS = {
  server: "https://res.cloudinary.com/analog-cafe/image/upload/",
  transformations: "c_scale,fl_progressive",
  sizes: {
    i: "40",
    t: "280",
    s: "520",
    m: "1268",
    l: "1800"
  },
  placeholder: dot
}
export const froth = options => frothInit(options, FROTH_CONSTANTS)
export { getFroth } from "@roast-cms/image-froth"

export const axiosRequest = request => {
  const requestConstructor = {
    method: request.method || "get",
    data: request.data || {},
    params: request.params || {},
    headers: request.headers || {},
    url: request.url
  }
  return requestConstructor
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill
export const polyfillArrayIncludes = () => {
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
      value: function(searchElement, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined')
        }
        var o = Object(this)
        var len = o.length >>> 0
        if (len === 0) {
          return false
        }
        var n = fromIndex | 0
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
        function sameValueZero(x, y) {
          return (
            x === y ||
            (typeof x === "number" &&
              typeof y === "number" &&
              isNaN(x) &&
              isNaN(y))
          )
        }
        while (k < len) {
          if (sameValueZero(o[k], searchElement)) {
            return true
          }
          k++
        }
        return false
      }
    })
  }
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
export const polyfillArrayFind = () => {
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, "find", {
      value: function(predicate) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined')
        }
        var o = Object(this)
        var len = o.length >>> 0
        if (typeof predicate !== "function") {
          throw new TypeError("predicate must be a function")
        }
        var thisArg = arguments[1]
        var k = 0
        while (k < len) {
          var kValue = o[k]
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue
          }
          k++
        }
        return undefined
      }
    })
  }
}
