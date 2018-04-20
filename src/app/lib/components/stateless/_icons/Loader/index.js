// tools
import React from "react"

import { LoaderContainer } from "./styles"

// return
export default props => {
  return (
    <LoaderContainer {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="28 22 20 20">
        <defs>
          <clipPath id="loader-clip">
            <rect x="20" y="0" width="44" height="40" />
          </clipPath>
        </defs>
        <path
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          clipPath="url(#loader-clip)"
          d="M70 38.9L70 28.3C70 25.6 67.8 23.3 65 23.3L61.6 23.3C58.9 23.3 56.6 25.5 56.6 28.3L56.6 33.9C56.6 36.6 54.4 38.9 51.6 38.9L48.2 38.9C45.5 38.9 43.2 36.7 43.2 33.9L43.2 28.3C43.2 25.6 41 23.3 38.2 23.3L35 23.3C32.3 23.3 30 25.5 30 28.3L30 33.9C30 36.6 27.8 38.9 25 38.9L21.6 38.9C18.9 38.9 16.6 36.7 16.6 33.9L16.6 28.3C16.6 25.6 14.4 23.3 11.6 23.3L8.2 23.3C5.5 23.3 3.2 25.5 3.2 28.3L3.2 33.9C3.2 36.6 1 38.9-1.8 38.9L-5 38.9C-7.7 38.9-10 36.7-10 33.9L-10 23.3"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            calcMode="linear"
            values="-20 0;7 0"
            keyTimes="0;1"
            dur="750ms"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            calcMode="linear"
            values="0 20 23 60;0 69 22.5 10"
            keyTimes="0;1"
            dur="750ms"
            begin="0s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </LoaderContainer>
  )
}
