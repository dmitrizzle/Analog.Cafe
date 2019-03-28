import React from "react"

import { GA, makeFroth } from "../../../../../utils"
import {
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../../../../constants/routes-article"
import { preloadConstructor } from "../../../../utils/routes-article"
import Bleed from "./Bleed"
import Link from "../../../controls/Link"
import ListItemAuthorDate from "./ListItemAuthorDate"
import ListItemStats from "./ListItemStats"
import ListUL from "./ListUL"
import ZigZagPicture from "./ZigZagPicture"

export const isXWeeksAgo = date => {
  const seconds = Math.floor(new Date() / 1000 - date)
  const weeks = Math.floor(seconds / 60 / 60 / 24 / 7)
  return weeks
}

export default props => {
  return (
    <Bleed author={props.author}>
      <ListUL status={props.status} author={props.author}>
        {props.items.map((item, index) => {
          // NOTE: index is used to show high quality image for first item

          const { isAdmin, readReceipts } = props
          const itemProps = {
            private: props.private,
            isAdmin,
            item,
            readReceipts
          }
          const dateProps =
            item && item.date && item.type !== "placeholder"
              ? {
                  isNew:
                    item.type !== "placeholder"
                      ? isXWeeksAgo(item.date.published) === 0
                      : null,
                  isNewlyEdited:
                    item.type !== "placeholder"
                      ? isXWeeksAgo(item.date.updated) === 0
                      : null,
                  isOldAndNewlyEdited:
                    isXWeeksAgo(item.date.published) > 0 &&
                    item.date.published < item.date.updated,
                  read: props.readReceipts
                    ? props.readReceipts.filter(
                        receipt =>
                          receipt.articleId === item.id &&
                          receipt.readOn > item.date.updated
                      ).length > 0
                    : null
                }
              : {}

          const listItemAuthorDateProps = { ...itemProps, ...dateProps }

          return (
            <li key={item._id || item.id}>
              <Link
                to={
                  item.slug &&
                  (props.private && !props.isUserFavourites
                    ? ROUTE_URL_SUBMISSIONS
                    : ROUTE_URL_ARTICLES) +
                    "/" +
                    item.slug
                }
                onClick={() => {
                  let label
                  if (dateProps.isNew && !dateProps.read) label = "new"
                  else if (dateProps.isOldAndNewlyEdited && !dateProps.read)
                    label = "updated"
                  else label = undefined

                  GA.event({
                    category: "Navigation",
                    action: "List.click",
                    label
                  })
                  props.nextArticleHeading(
                    preloadConstructor(props.article, item)
                  )
                }}
                onMouseOver={
                  "ontouchstart" in document.documentElement
                    ? null
                    : props.userIntent
                }
              >
                <section>
                  <figure
                    style={
                      item.status === "rejected" ? { opacity: "0.25" } : null
                    }
                  >
                    {item.type !== "placeholder" && (
                      <div
                        style={{
                          backgroundImage: item.poster
                            ? `url(${
                                makeFroth({
                                  src: item.poster,
                                  size: index ? "s" : "m"
                                }).src
                              })`
                            : undefined
                        }}
                        aria-label={item.title + " poster image"}
                      />
                    )}
                  </figure>
                  <div>
                    <h2
                      style={{
                        opacity:
                          item.status === "rejected" ? "0.25" : undefined,
                        letterSpacing:
                          item.type !== "placeholder" ? undefined : "-0.13em"
                      }}
                    >
                      {item.title}
                    </h2>
                    <h3
                      style={{
                        letterSpacing:
                          item.type !== "placeholder" ? undefined : "-0.165em",
                        paddingLeft:
                          item.type !== "placeholder" ? undefined : ".05em"
                      }}
                    >
                      {item.subtitle || ""}
                    </h3>
                    <div>
                      <ListItemStats item={item} private={props.private} />
                      <ListItemAuthorDate {...listItemAuthorDateProps} />
                    </div>
                  </div>
                </section>
                <ZigZagPicture
                  index={index}
                  style={{
                    backgroundImage: item.poster
                      ? `url(${
                          makeFroth({
                            src: item.poster,
                            size: index ? "s" : "m"
                          }).src
                        })`
                      : undefined
                  }}
                />
              </Link>
            </li>
          )
        })}
      </ListUL>
    </Bleed>
  )
}
