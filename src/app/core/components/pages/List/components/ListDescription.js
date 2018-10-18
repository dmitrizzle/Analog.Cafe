import React from "react"

import { APP_NAME, HEADER_ERRORS } from "../../../../../constants"
import { ROUTE_API_AUTHORS } from "../../../../constants/routes-article"
import { getFirstNameFromFull } from "../../../../utils/messages-author"
import ListBrandName from "./ListBrandName"
import ListDescriptionWrapper from "./ListDescriptionWrapper"
import ListHeader from "./ListHeader"
import Modal from "../../../controls/Modal"

export default props => {
  return (
    <ListDescriptionWrapper {...props}>
      <ListBrandName homepage={props.location.pathname === "/"}>
        {APP_NAME}
      </ListBrandName>
      {props.user.connection.status !== "offline" ? (
        <ListHeader>
          {props.list.filter.author ? (
            <span>
              <em>
                {props.list.error
                  ? props.list.error.title
                  : props.renderedListMeta.title}
                {props.list.filter.author.name ? " " : null}
                {props.list.filter.author.name ? (
                  <span>
                    by{" "}
                    <Modal
                      with={{
                        request: {
                          url:
                            ROUTE_API_AUTHORS +
                            "/" +
                            props.list.filter.author.id
                        }
                      }}
                    >
                      {getFirstNameFromFull(props.list.filter.author.name)}
                    </Modal>
                  </span>
                ) : (
                  props.location.pathname.includes("/author/") && ".."
                )}
              </em>
            </span>
          ) : (
            <span>
              <em>{props.renderedListMeta.title}</em>
            </span>
          )}
          {props.list.filter.author && props.list.filter.author.name
            ? "."
            : props.list.error
              ? " " + props.list.error.emoji
              : "."}
        </ListHeader>
      ) : (
        <ListHeader>
          <em>{HEADER_ERRORS.LIST_OFFLINE.title}</em>{" "}
          {HEADER_ERRORS.LIST_OFFLINE.emoji}
        </ListHeader>
      )}
    </ListDescriptionWrapper>
  )
}
