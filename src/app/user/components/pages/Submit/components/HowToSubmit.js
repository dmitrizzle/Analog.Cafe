import React from "react"

import Figure from "../../../../../core/components/vignettes/Picture/components/Figure"
import Link from "../../../../../core/components/controls/Link"

export default () => {
  return (
    <div>
      <Figure
        src="https://res.cloudinary.com/analog-cafe/image/upload/v1528904759/image-froth_1010453_425a5704760c4879b31e008315c3047c.gif"
        alt="A short demo of the submission process to Analog.Cafe"
      >
        The “Composer” tool will help you create and send submissions.
      </Figure>
      <p>
        Analog.Cafe owes its existence to the diverse, expressive, and
        informative works of artists, writers, and film photographers like you.
      </p>
      <p>
        Together, we are building a place to discover beauty, get inspired, and
        learn something new. <strong>Join us.</strong>
      </p>
      <p>
        We edit each submission to make sure that all articles read and look
        fantastic, and every author is proud to have their work published on
        Analog.Cafe.
      </p>
    </div>
  )
}
