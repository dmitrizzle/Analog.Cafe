import LazyLoad from "react-lazyload"
import React from "react"

import { AuthorAndDate, Ul } from "./styles/ul"
import { Bleed } from "./styles/bleed"
import { Caption } from "./styles/caption"
import { INPUT_SUMMARY_LIMIT } from "../../../../user/constants/rules-submission"
import {
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../../../constants/routes-article"
import { Stats } from "./styles/stats"
import { TEXT_EMOJIS } from "../../../../constants"
import { TEXT_STATUS_LABELS } from "../../../constants/messages-list"
import { ZigzagPicture } from "./styles/zigzag-picture"
import { makeFroth } from "../../../../utils"
import { getAuthorListStringFromArray } from "../../../utils/messages-author"
import { getHumanDatestamp } from "../../../utils/messages-"
import Link from "../../controls/Link"

// return
const ListSubtitle = props => {
  return (
    <span>
      <span>
        {props.title}
        &nbsp;
      </span>
      {props.subtitle && <span>({props.subtitle}) &nbsp;</span>}
    </span>
  )
}
export default props => {
  return (
    <Bleed>
      <Ul status={props.status}>
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
                    props.nextArticleHeading({
                      title: item.title,
                      subtitle: item.subtitle,
                      authors: item.authors,
                      slug: item.slug,
                      poster: item.poster,
                      tag: item.tag
                    })
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
                    <h2
                      title={item.title}
                      style={
                        item.status === "rejected" ? { opacity: "0.25" } : null
                      }
                    >
                      {item.title}
                    </h2>
                    <Caption
                      status={props.status}
                      style={
                        item.status === "rejected" ? { opacity: "0.25" } : null
                      }
                    >
                      <ListSubtitle
                        subtitle={item.subtitle}
                        title={item.title}
                      />
                      {/* Two versions of summary for different screens: long and short */}
                      <span className="long">
                        <span style={{ fontStyle: "normal" }}>
                          {TEXT_EMOJIS.PARAGRAPH}
                        </span>
                        {item.summary.substr(0, INPUT_SUMMARY_LIMIT - 1) + "…"}
                      </span>
                      <span className="short">
                        <span style={{ fontStyle: "normal" }}>
                          {TEXT_EMOJIS.PARAGRAPH}
                        </span>
                        {item.summary.substr(
                          0,
                          INPUT_SUMMARY_LIMIT / 1.6 -
                            (item.subtitle || "").length -
                            item.title.length -
                            1
                        ) + "…"}
                      </span>
                    </Caption>
                    <div>
                      <Stats {...props}>
                        {/* has this work ever been published? */}
                        {item.type !== "placeholder" &&
                          props.private &&
                          item.tag &&
                          "#"}

                        {/* item category tag */}
                        {item.tag
                          ? item.tag === "photo-essay" &&
                            item.stats.images === 1
                            ? "Single-Frame Narrative"
                            : (item.tag + "")
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, l => l.toUpperCase())
                          : "Submitted"}

                        {/* item read time or # of images */}
                        {item.type !== "placeholder" &&
                          !props.private &&
                          (item.tag !== "photo-essay"
                            ? ` | ${Math.ceil(
                                (item.stats.words + 101) / 200
                              )}-minute read`
                            : ` | ${item.stats.images} image${
                                item.stats.images > 1 ? "s" : ""
                              }`)}

                        {/* status of the submission */}
                        {item.type !== "placeholder" &&
                          props.private &&
                          ` ↝ ${TEXT_STATUS_LABELS[item.status]}`}
                        {/* TEXT_EMOJIS.MONOCLE + " Pending Editorial Review" */}
                      </Stats>
                      <AuthorAndDate>
                        {!props.private || props.isAdmin
                          ? `${getAuthorListStringFromArray(item.authors, {
                              trim: true
                            })} · `
                          : null}
                        {item.type !== "placeholder" && (
                          <small>
                            {getHumanDatestamp(item.date.published)}
                          </small>
                        )}
                      </AuthorAndDate>
                    </div>
                  </section>
                  <ZigzagPicture
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
      </Ul>
    </Bleed>
  )
}
