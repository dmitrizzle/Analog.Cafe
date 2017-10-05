// tools
import React from "react"
import Link from "../Link"
import { froth } from "../../../utils/image-froth"

// styles
import { Bleed } from "./styles/bleed"
import { Ul } from "./styles/ul"
import { Stats } from "./styles/stats"
import { Caption } from "./styles/caption"
import { ZigzagPicture } from "./styles/zigzag-picture"

// helper
import { datestamp } from "../../../utils/datestamp"

// constants
import { ROUTE_ARTICLE_DIR, SUMMARY_LENGTH_MAX } from "../../../constants/list"

// return
const ListSubtitle = props => {
  return (
    <span style={{ display: "block" }}>
      {/* remove title case but capitalize first letter */
      props.subtitle.charAt(0).toUpperCase() +
        props.subtitle.substring(1).toLowerCase()}
      {/* add a period if subtitle doesn't end with punctuation: */
      !props.subtitle.match(/.[.,:!?]$/) && "."}
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
            <li key={item.id}>
              <Link
                to={item.slug && ROUTE_ARTICLE_DIR + "/" + item.slug}
                onClick={() =>
                  props.nextArticleHeading({
                    title: item.title,
                    subtitle: item.subtitle,
                    author: item.author,
                    slug: item.slug,
                    poster: item.poster
                  })}
              >
                <section>
                  <figure>
                    {item.type !== "placeholder" && (
                      <div
                        style={
                          item.poster && {
                            backgroundImage:
                              "url(" +
                              froth({
                                src: item.poster.medium,
                                size: index ? "s" : "m"
                              }).src +
                              ")"
                          }
                        }
                        aria-label={item.title + " poster image"}
                      />
                    )}
                  </figure>
                  <h2 title={item.title}>{item.title}</h2>
                  <Caption status={props.status}>
                    {item.subtitle && <ListSubtitle subtitle={item.subtitle} />}
                    {item.summary.length > SUMMARY_LENGTH_MAX ? (
                      item.summary.substr(0, SUMMARY_LENGTH_MAX - 1) + "…"
                    ) : (
                      item.summary
                    )}
                  </Caption>
                  <div>
                    <Stats {...props}>
                      {item.tag === "photo-essay" && item.stats.images === 1 ? (
                        "Single-Frame Narrative"
                      ) : !props.private ? (
                        (item.tag + "")
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, l => l.toUpperCase())
                      ) : (
                        "Submission"
                      )}
                      {item.type !== "placeholder" &&
                      !props.private ? item.tag !== "photo-essay" ? (
                        " | " +
                        Math.round(item.stats.words / 200) +
                        "-minute read"
                      ) : (
                        " | " +
                        item.stats.images +
                        " Image" +
                        (item.stats.images > 1 ? "s" : "")
                      ) : item.status === "pending" ? (
                        " | Under Review"
                      ) : null}
                    </Stats>
                    {!props.private ? (
                      <em>
                        {item.author.name}
                        {item.type !== "placeholder" &&
                          " · " + datestamp(item["post-date"])}
                      </em>
                    ) : (
                      <em>
                        {item["post-date"] && datestamp(item["post-date"])}
                      </em>
                    )}
                  </div>
                </section>
                <ZigzagPicture
                  style={
                    item.type !== "placeholder" && item.poster ? (
                      {
                        backgroundImage: `url(${froth({
                          src: item.poster.medium,
                          size: index ? "s" : "m"
                        }).src})`
                      }
                    ) : null
                  }
                />
              </Link>
            </li>
          )
        })}
      </Ul>
    </Bleed>
  )
}
