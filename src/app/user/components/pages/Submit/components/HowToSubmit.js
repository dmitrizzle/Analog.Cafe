import React from "react"

import Figure from "../../../../../core/components/vignettes/Picture/components/Figure"
import Link from "../../../../../core/components/controls/Link"

export default () => {
  return (
    <div>
      <Figure
        src="https://res.cloudinary.com/analog-cafe/image/upload/v1528904759/image-froth_1010453_425a5704760c4879b31e008315c3047c.gif"
        alt="A short demo of the submission process to Analog.Cafe"
        caption
      >
        Analog.Cafe “Composer” tool is easy to use and works offline.
      </Figure>
      <p>
        <strong>Learn more</strong> about the types of content we publish,
        quality prerequisites, edits, and our mission in Dmitri’s editorial “
        <Link to="/zine/open-call-g99w">Open Call</Link>
        .”
      </p>
    </div>
  )
}
