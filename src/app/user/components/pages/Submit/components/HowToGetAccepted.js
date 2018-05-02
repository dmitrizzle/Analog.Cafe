import React from "react"

import Link from "../../../../../core/components/controls/Link"

export default () => {
  return (
    <div>
      <h3>How to get accepted.</h3>
      <p>
        Analog.Cafe focuses heavily on film photography as the subject of every
        submission. That being said, if your work suits the general style of the
        publication but doesn&rsquo;t use photographs shot on film it can still
        be accepted.
      </p>
      <p>Here is a list of formats submissions are typically accepted in:</p>
      <ul>
        <li>
          <strong>A Photo</strong> &mdash; one image, a title and perhaps a
          caption for the photograph.
        </li>
        <li>
          <strong>A Photo Essay</strong> &mdash; you can have one image with a
          story or a few images that make up a narrative.
        </li>
        <li>
          <strong>An Opinion/Article</strong> &mdash; your thoughts, advice, and
          opinions on film photography and art in general.{" "}
          <em>
            Please see <Link to="/articles">Articles</Link> section for examples
            of appropriate submissions.
          </em>
        </li>
      </ul>

      <p>
        For images, JPG and PNG formats are accepted, maximum 10MB per file.
        Please make sure the quality is good enough to display on large screens.
      </p>
    </div>
  )
}
