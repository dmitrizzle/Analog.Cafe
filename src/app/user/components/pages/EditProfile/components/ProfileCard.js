import React from "react"

import { CardIntegratedForColumns } from "../../../../../core/components/controls/ArticleActions/components/Options"
import {
  INPUT_SUMMARY_LIMIT,
  INPUT_TITLE_LIMIT
} from "../../../../constants/rules-submission"
import { makeFroth } from "../../../../../utils"
import Placeholder from "../../../../../core/components/vignettes/Picture/components/Placeholder"
import ProfileButton from "./ProfileButton"
import ProfileCaption from "./ProfileCaption"
import ProfileHeader from "./ProfileHeader"
import SubtitleInput from "../../../forms/TextInput/components/SubtitleInput"

export default props => {
  return (
    <React.Fragment>
      <CardIntegratedForColumns>
        <ProfileHeader>
          <SubtitleInput
            placeholder="Your Name"
            value={props.title || ""}
            maxLength={INPUT_TITLE_LIMIT}
            autoFocus
            onChange={event => props.changeTitle(event)}
            warning={props.warningTitle}
          />
        </ProfileHeader>
        <figure>
          <Placeholder frothId={props.image}>
            <img
              src={makeFroth({ src: props.image, size: "s" }).src}
              alt="Profile avatar"
              onClick={() => props.changeImage()}
              style={{ cursor: "pointer" }}
            />
          </Placeholder>
        </figure>
      </CardIntegratedForColumns>
      <CardIntegratedForColumns>
        <figcaption>
          <ProfileCaption
            maxLength={INPUT_SUMMARY_LIMIT}
            placeholder="Your short author bio goes here."
            onChange={event => props.changeText(event)}
            value={props.text || ""}
            warning={props.warningText}
          />
        </figcaption>
        <ProfileButton
          value={props.buttonText || ""}
          placeholder="Website"
          maxLength={INPUT_SUMMARY_LIMIT}
          onChange={event => props.changeButton(event)}
          onFocus={() => props.focusButton()}
          onBlur={() => props.blurButton()}
        />
      </CardIntegratedForColumns>
    </React.Fragment>
  )
}
