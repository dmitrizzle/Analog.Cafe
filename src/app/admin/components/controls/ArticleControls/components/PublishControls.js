import { ButtonStrip } from "@roast-cms/react-button-beans"
import React from "react"

import { TEXT_EMOJIS } from "../../../../../constants"
import Button from "../../../../../core/components/controls/Button/components/Button"
import ButtonStripItem from "../../../../../core/components/controls/Button/components/ButtonStripItem"
import CardIntegrated from "../../../../../core/components/controls/Card/components/CardIntegrated"

const TAGS = {
  culture: "Culture",
  places: "Places",
  "film-photography": "Photography",
  editorials: "Editorials",
  opinions: "Opinions"
}

export default props => {
  return (
    <div style={{ display: props.statePublishControls ? "block" : "none" }}>
      <ButtonStrip
        style={{
          margin: "0.5em auto 0.075em",
          width: "auto",
          overflow: "scroll",
          padding: "1px 1px 3px"
        }}
      >
        <div style={{ minWidth: "30em" }}>
          {Object.keys(TAGS).map((key, i) => {
            let last = i === Object.keys(TAGS).length - 1
            return (
              <ButtonStripItem
                left={i === 0}
                right={last}
                key={key}
                onClick={event => props.setPublicationTag(event, key)}
                style={key === "film-photography" ? { minWidth: "7.5em" } : {}}
                inverse={props.statePublishAs === key}
                to={`#${key}`}
              >
                {TAGS[key]}
              </ButtonStripItem>
            )
          })}
        </div>
      </ButtonStrip>
      <CardIntegrated
        style={{
          marginBottom: 0,
          marginTop: "0.5em",
          display: props.statePublishAs ? "block" : "none"
        }}
      >
        <Button branded>Add to Queue</Button>
        <Button
          onClick={props.publishNow}
          loading={props.editor.publish.id === props.article.id}
        >
          {props.editor.publish.id !== props.article.id &&
            (props.stateAllowPublish
              ? TEXT_EMOJIS.UNLOCKED
              : TEXT_EMOJIS.LOCKED)}{" "}
          Publish Now
        </Button>
      </CardIntegrated>
    </div>
  )
}
