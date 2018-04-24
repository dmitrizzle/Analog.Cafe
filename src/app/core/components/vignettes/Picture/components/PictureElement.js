import LazyLoad from "react-lazyload"
import React from "react"

import { PicturePlaceholder } from "./PicturePlaceholder"
import { froth } from "../../../../utils/image-froth"

// return
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
        {/*
          data-src should not have src versions since it could bloat the file size
          and is unnecessary since it'd be the highest res file anyways
          `!src.includes("data:image")`
        */}

        {!src.includes("data:image") &&
          froth({ src, size: "s", type: "webp" }).type === "webp" && (
            <source
              // mobile image size
              srcSet={froth({ src, size: "s", type: "webp" }).src}
              media="(max-width: 480px)"
              type="image/webp"
            />
          )}
        {!src.includes("data:image") &&
          froth({ src, size: "s", type: "webp" }).type === "webp" && (
            <source
              // medium image size, largest for all images that aren't "features"
              srcSet={froth({ src, size: "m", type: "webp" }).src}
              media="(max-width: 1200px)"
              type="image/webp"
            />
          )}
        {!src.includes("data:image") &&
          froth({ src, size: "s", type: "webp" }).type === "webp" && (
            <source
              // max image size, extra large only if it's a "feature"
              srcSet={froth({ src, size: largestSize, type: "webp" }).src}
              media="(min-width: 1201px)"
              type="image/webp"
            />
          )}

        {/* JPG */}
        {!src.includes("data:image") && (
          <source
            // mobile image size
            srcSet={froth({ src, size: "s" }).src}
            media="(max-width: 480px)"
          />
        )}
        {!src.includes("data:image") && (
          <source
            // medium image size, largest for all images that aren't "features"
            srcSet={froth({ src, size: "m" }).src}
            media="(max-width: 1200px)"
          />
        )}
        {!src.includes("data:image") && (
          <source
            // max image size, extra large only if it's a "feature"
            srcSet={froth({ src, size: largestSize }).src}
            media="(min-width: 1201px)"
          />
        )}
        <LazyLoad unmountIfInvisible once offset={300} height={"100%"}>
          <img
            // default image size
            src={froth({ src, size: "m" }).src}
            alt={alt}
            className={className}
            style={{ height: froth({ src }).ratio ? "100%" : "initial" }}
          />
        </LazyLoad>
      </picture>
    </PicturePlaceholder>
  )
}
