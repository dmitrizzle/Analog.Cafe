import React from "react"

import { Button } from "../../../../../core/components/controls/Button"
import {
  ButtonStrip,
  Item
} from "../../../../../core/components/controls/ButtonStrip"
import { CardFlattened } from "../../../../../core/components/controls/Card/styles"
import { TEXT_EMOJIS } from "../../../../../constants"

const TAGS = {
  story: "Story",
  editorial: "Editorial",
  guide: "Guide",
  review: "Review",
  "photo-essay": "Photo Essay"
}

export default props => {
  return (
    <div style={{ display: props.statePublishControls ? "block" : "none" }}>
      <ButtonStrip
        style={{
          margin: "0.5em auto 0",
          width: "auto",
          overflow: "scroll",
          padding: "1px 1px 3px"
        }}
      >
        <div>
          {Object.keys(TAGS).map((key, i) => {
            let last = i === Object.keys(TAGS).length - 1
            return (
              <Item
                left={i === 0}
                right={last}
                key={key}
                onClick={event => props.setPublicationTag(event, key)}
                style={key === "photo-essay" ? { minWidth: "7.5em" } : {}}
                inverse={props.statePublishAs === key}
                to={`#${key}`}
              >
                {TAGS[key]}
              </Item>
            )
          })}
        </div>
      </ButtonStrip>
      <CardFlattened
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
              ? TEXT_EMOJIS.LOCKED
              : TEXT_EMOJIS.UNLOCKED)}{" "}
          Publish Now
        </Button>
      </CardFlattened>
    </div>
  )
}
