import LazyLoad from "react-lazyload"
import React from "react"

import { PicturePlaceholder } from "./PicturePlaceholder"
import { makeFroth } from "../../../../../utils"

export default props => {
  let src = props.src
  const className = props.className
  const classFeature = "Featured image"
  const classNofeature = "Supporting image"
  const by = " by "
  let alt
  if (props.alt) alt = props.alt
  else if (props.author && props.author.name)
    alt = props.feature
      ? classFeature + by + props.author.name
      : classNofeature + by + props.author.name
  else alt = props.feature ? classFeature : classNofeature
  let largestSize = props.feature ? "l" : "m"
  return (
    <PicturePlaceholder preserve frothId={src}>
      <picture>
        {!src.includes("data:image") &&
          makeFroth({ src, size: "s", type: "webp" }).type === "webp" && (
            <source
              srcSet={makeFroth({ src, size: "s", type: "webp" }).src}
              media="(max-width: 480px)"
              type="image/webp"
            />
          )}
        {!src.includes("data:image") &&
          makeFroth({ src, size: "s", type: "webp" }).type === "webp" && (
            <source
              srcSet={makeFroth({ src, size: "m", type: "webp" }).src}
              media="(max-width: 1200px)"
              type="image/webp"
            />
          )}
        {!src.includes("data:image") &&
          makeFroth({ src, size: "s", type: "webp" }).type === "webp" && (
            <source
              srcSet={makeFroth({ src, size: largestSize, type: "webp" }).src}
              media="(min-width: 1201px)"
              type="image/webp"
            />
          )}
        {!src.includes("data:image") && (
          <source
            srcSet={makeFroth({ src, size: "s" }).src}
            media="(max-width: 480px)"
          />
        )}
        {!src.includes("data:image") && (
          <source
            srcSet={makeFroth({ src, size: "m" }).src}
            media="(max-width: 1200px)"
          />
        )}
        {!src.includes("data:image") && (
          <source
            srcSet={makeFroth({ src, size: largestSize }).src}
            media="(min-width: 1201px)"
          />
        )}
        <LazyLoad unmountIfInvisible once offset={300} height={"100%"}>
          <img
            src={makeFroth({ src, size: "m" }).src}
            alt={alt}
            className={className}
            style={{ height: makeFroth({ src }).ratio ? "100%" : "initial" }}
          />
        </LazyLoad>
      </picture>
    </PicturePlaceholder>
  )
}
