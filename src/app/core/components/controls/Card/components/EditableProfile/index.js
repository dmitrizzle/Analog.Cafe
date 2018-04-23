import React from "react"

import {
  CardFlattened,
  CardCaptionEditable,
  CardButtonEditable,
  CardHeaderEditable
} from "./styles"
import { PicturePlaceholder } from "../../../../vignettes/Picture/components/PicturePlaceholder"
import {
  INPUT_SUMMARY_LIMIT,
  INPUT_TITLE_LIMIT
} from "../../../../../../user/constants/input"
import { SubtitleInput } from "../../../../../../user/components/forms/InputStyles"
import { froth } from "../../../../../utils/image-froth"

// return
export default props => {
  return (
    <CardFlattened>
      <CardHeaderEditable>
        <SubtitleInput
          placeholder="Your Name"
          value={props.title || ""}
          maxLength={INPUT_TITLE_LIMIT}
          autoFocus
          onChange={event => props.changeTitle(event)}
          warning={props.warningTitle}
        />
      </CardHeaderEditable>
      <figure>
        <PicturePlaceholder frothId={props.image}>
          <img
            src={froth({ src: props.image, size: "s" }).src}
            alt="Profile avatar"
            onClick={() => props.changeImage()}
            style={{ cursor: "pointer" }}
          />
        </PicturePlaceholder>
        <figcaption>
          <CardCaptionEditable
            maxLength={INPUT_SUMMARY_LIMIT}
            placeholder="Your short author bio goes here."
            onChange={event => props.changeText(event)}
            value={props.text || ""}
            warning={props.warningText}
          />
        </figcaption>
      </figure>
      <CardButtonEditable
        value={props.buttonText || ""}
        placeholder="Website"
        maxLength={INPUT_SUMMARY_LIMIT}
        onChange={event => props.changeButton(event)}
        onFocus={() => props.focusButton()}
        onBlur={() => props.blurButton()}
      />
    </CardFlattened>
  )
}
