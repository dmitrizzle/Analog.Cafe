import { froth } from "@roast-cms/image-froth"

import { DATA_GA_ID, DOCUMENT_BLANK_DOT } from "./constants"

export const createGA = new Promise((resolve, reject) => {
  if (localStorage.getItem("ga-enabled") !== "false")
    import("react-ga").then(ReactGA => {
      resolve(ReactGA)
    })
})
export const GA = {
  initialize: () => {
    createGA.then(ReactGA => {
      ReactGA.initialize(DATA_GA_ID, {
        // debug:
        //   process.env.NODE_ENV === "development" || HOST_RUNTIME !== HOST_PROD,
        titleCase: true,
        gaOptions: {},
        gaAddress: process.env.PUBLIC_URL + "/analytics-201808051558.js"
      })
    })
  },
  pageview: url => {
    createGA.then(ReactGA => {
      ReactGA.pageview(url || window.location.pathname + window.location.search)
    })
  },
  modalview: loc => {
    createGA.then(ReactGA => {
      ReactGA.modalview(loc)
    })
  },
  event: options => {
    createGA.then(ReactGA => {
      ReactGA.event(options)
    })
  }
}

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
  placeholder: DOCUMENT_BLANK_DOT
}
export const makeFroth = options => froth(options, FROTH_CONSTANTS)

export const makeAPIRequest = request => {
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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
