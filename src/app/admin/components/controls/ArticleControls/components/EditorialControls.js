import { ButtonStrip } from "@roast-cms/react-button-beans"
import React from "react"

import { TEXT_EMOJIS } from "../../../../../constants"
import ButtonStripItem from "../../../../../core/components/controls/Button/components/ButtonStripItem"

export default props => {
  return (
    <ButtonStrip
      style={{
        margin: "1em auto 0",
        width: props.isAdmin ? "16em" : "6em",
        whiteSpace: "nowrap",
        display: props.article.status !== "rejected" ? "block" : "none"
      }}
    >
      <div>
        <ButtonStripItem
          right={!props.isAdmin}
          left
          onClick={props.edit}
          style={{
            minWidth: "5em"
          }}
        >
          <span role="img" aria-label="(Un)Locked button">
            {props.stateAllowOverwrite
              ? TEXT_EMOJIS.UNLOCKED
              : TEXT_EMOJIS.LOCKED}
          </span>{" "}
          Edit
        </ButtonStripItem>
        {props.article.status === "published" && props.isAdmin ? (
          <ButtonStripItem
            key="ButtonStrip_Item_unpublish"
            onClick={props.unpublish}
            right
          >
            <span role="img" aria-label="(Un)Locked button">
              {props.stateAllowUnpublish
                ? TEXT_EMOJIS.UNLOCKED
                : TEXT_EMOJIS.LOCKED}
            </span>{" "}
            Unpublish
          </ButtonStripItem>
        ) : (
          [
            props.article.status !== "unpublished" && props.isAdmin ? (
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
                    ? TEXT_EMOJIS.UNLOCKED
                    : TEXT_EMOJIS.LOCKED}
                </span>{" "}
                Reject
              </ButtonStripItem>
            ) : null,
            props.isAdmin ? (
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
                  ? `${
                      props.article.status === "unpublished"
                        ? "Republish"
                        : "Publish"
                    }`
                  : "Edit Schedule"}
              </ButtonStripItem>
            ) : null
          ]
        )}
      </div>
    </ButtonStrip>
  )
}
