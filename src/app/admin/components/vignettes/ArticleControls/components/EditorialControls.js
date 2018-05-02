import { ButtonStrip } from "@roast-cms/react-button-beans"
import React from "react"

import { TEXT_EMOJIS } from "../../../../../constants"
import ButtonStripItem from "../../../../../core/components/controls/Button/components/ButtonStripItem"

export default props => {
  return (
    <ButtonStrip
      style={{
        margin: "1em auto 0",
        width: "16em",
        display: props.article.status !== "rejected" ? "block" : "none"
      }}
    >
      <div>
        <ButtonStripItem
          left
          onClick={props.edit}
          style={{
            minWidth: "5em"
          }}
        >
          <span role="img" aria-label="(Un)Locked button">
            {props.stateAllowOverwrite
              ? TEXT_EMOJIS.LOCKED
              : TEXT_EMOJIS.UNLOCKED}
          </span>{" "}
          Edit
        </ButtonStripItem>
        {props.article.status === "published"
          ? [
              <ButtonStripItem
                key="ButtonStrip_Item_update"
                onClick={props.sync}
              >
                <span role="img" aria-label="(Un)Locked button">
                  {props.stateAllowSync
                    ? TEXT_EMOJIS.LOCKED
                    : TEXT_EMOJIS.UNLOCKED}
                </span>{" "}
                Sync
              </ButtonStripItem>,
              <ButtonStripItem key="ButtonStrip_Item_unpublish" right>
                Unpublish
              </ButtonStripItem>
            ]
          : [
              <ButtonStripItem
                key="ButtonStrip_Item_reject"
                onClick={props.reject}
                inverse={props.editor.reject.id === props.article.id}
                style={{
                  minWidth: "6em",
                  display:
                    props.article.status !== "scheduled" ? "block" : "none"
                }}
              >
                <span role="img" aria-label="(Un)Locked button">
                  {props.stateAllowReject
                    ? TEXT_EMOJIS.LOCKED
                    : TEXT_EMOJIS.UNLOCKED}
                </span>{" "}
                Reject
              </ButtonStripItem>,
              <ButtonStripItem
                right
                inverse={props.statePublishControls}
                style={
                  props.article.status === "scheduled"
                    ? { minWidth: "8em" }
                    : {}
                }
                onClick={
                  props.article.status !== "scheduled"
                    ? props.showPublishControls
                    : null
                }
                key="ButtonStrip_Item_publish"
              >
                {props.article.status !== "scheduled"
                  ? "Publish"
                  : "Edit Schedule"}
              </ButtonStripItem>
            ]}
      </div>
    </ButtonStrip>
  )
}
