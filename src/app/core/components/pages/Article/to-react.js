import React from "react"
import uuidv1 from "uuid/v1"

import Link from "../../controls/Link"
import Picture from "../../vignettes/Picture"

export const RULES_SERIALIZATION = [
  {
    serialize(node, children) {
      console.log(node)
      const key = uuidv1().substr(0, 8)
      const element = node.type
      switch (element) {
        case "paragraph": {
          return <p key={key}>{children}</p>
        }
        case "quote": {
          return (
            <div style={{ clear: "both" }} key={key}>
              <blockquote>{children}</blockquote>
            </div>
          )
        }
        case "heading": {
          return <h3 key={key}>{children}</h3>
        }
        case "divider": {
          return <hr key={key} />
        }
        case "italic": {
          return <em key={key}>{children}</em>
        }
        case "bold": {
          return <strong key={key}>{children}</strong>
        }
        case "link": {
          // NOTE: needs to be made relative wtih `makeRelative(href,domain)`
          return (
            <Link key={key} to={node.data.href}>
              {children}
            </Link>
          )
        }
        case "image": {
          return (
            <Picture
              readOnly={true}
              key={key}
              editor={{ value: { isFocused: false, isSelected: false } }}
              node={{
                data: {
                  get: key => node.data[key]
                }
              }}
            />
          )
        }
        default:
          return <span key={key}>{children}</span>
      }
    }
  }
]

const rules = [
  ...RULES_SERIALIZATION,
  {
    serialize(obj, children) {
      if (obj.object === "string") {
        return children.split("\n").reduce((array, text, i) => {
          if (i != 0) array.push(<br key={i} />)
          array.push(text)
          return array
        }, [])
      }
    }
  }
]

let serializeNode, serializeLeaf, serializeString, cruftNewline, addKey

const toReact = (value, options = {}) => {
  const { document } = value
  const elements = document.nodes.map(serializeNode).filter(Boolean)

  return elements
}

serializeNode = node => {
  if (node.object === "text") {
    const { leaves } = node
    return leaves.map(serializeLeaf)
  }

  const children = node.nodes.map(serializeNode)

  for (const rule of rules) {
    if (!rule.serialize) continue
    const ret = rule.serialize(node, children)
    if (ret === null) return
    if (ret) return addKey(ret)
  }

  throw new Error(`No serializer defined for node of type "${node.type}".`)
}

serializeLeaf = leaf => {
  const string = { object: "string", text: leaf.text }
  const text = serializeString(string)
  if (!leaf.marks) return leaf.text

  return leaf.marks.reduce((children, mark) => {
    for (const rule of rules) {
      if (!rule.serialize) continue
      const ret = rule.serialize(mark, children)
      if (ret === null) return
      if (ret) return addKey(ret)
    }

    throw new Error(`No serializer defined for mark of type "${mark.type}".`)
  }, text)
}

serializeString = string => {
  for (const rule of rules) {
    if (!rule.serialize) continue
    const ret = rule.serialize(string, string.text)
    if (ret) return ret
  }
}

cruftNewline = element =>
  !(element.nodeName === "#text" && element.nodeValue == "\n")

let key = 0

addKey = element => React.cloneElement(element, { key: key++ })

export default toReact
