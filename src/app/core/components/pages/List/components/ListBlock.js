import LazyLoad from "react-lazyload"
import React from "react"

import {
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../../../../constants/routes-article"
import { makeFroth } from "../../../../../utils"
import { preloadConstructor } from "../../../../utils/routes-article"
import Bleed from "./Bleed"
import Link from "../../../controls/Link"
import ListItemAuthorDate from "./ListItemAuthorDate"
import ListItemStats from "./ListItemStats"
import ListUL from "./ListUL"
import ZigZagPicture from "./ZigZagPicture"

export default props => {
  return (
    <Bleed>
      <ListUL status={props.status}>
        {props.items.map((item, index) => {
          // NOTE: index is used to show high quality image for first item
          return (
            <LazyLoad
              unmountIfInvisible
              once
              offset={300}
              height={"100%"}
              key={item._id || item.id}
            >
              <li>
                <Link
                  to={
                    item.slug &&
                    (props.private
                      ? ROUTE_URL_SUBMISSIONS
                      : ROUTE_URL_ARTICLES) +
                      "/" +
                      item.slug
                  }
                  onClick={() =>
                    props.nextArticleHeading(
                      preloadConstructor(props.article, item)
                    )
                  }
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
                          style={
                            item.poster && {
                              backgroundImage:
                                "url(" +
                                makeFroth({
                                  src: item.poster,
                                  size: index ? "s" : "m"
                                }).src +
                                ")"
                            }
                          }
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
                            item.type !== "placeholder"
                              ? undefined
                              : "-0.165em",
                          paddingLeft:
                            item.type !== "placeholder" ? undefined : ".05em"
                        }}
                      >
                        {item.subtitle || ""}
                      </h3>
                      <div>
                        <ListItemStats item={item} private={props.private} />
                        <ListItemAuthorDate
                          private={props.private}
                          isAdmin={props.isAdmin}
                          item={item}
                        />
                      </div>
                    </div>
                  </section>
                  <ZigZagPicture
                    style={
                      item.type !== "placeholder" && item.poster
                        ? {
                            backgroundImage: `url(${
                              makeFroth({
                                src: item.poster,
                                size: index ? "s" : "m"
                              }).src
                            })`,
                            opacity: item.status === "rejected" ? "0.25" : null
                          }
                        : null
                    }
                  />
                </Link>
              </li>
            </LazyLoad>
          )
        })}
      </ListUL>
    </Bleed>
  )
}
