import React from "react"

import Link from "../../controls/Link"
import Picture from "../../vignettes/Picture"

export const RULES_SERIALIZATION = [
  {
    serialize(node, children) {
      const element = node.type
      switch (element) {
        case "paragraph": {
          return addKey(<p>{children}</p>)
        }
        case "quote": {
          return addKey(
            <div style={{ clear: "both" }}>
              <blockquote>{children}</blockquote>
            </div>
          )
        }
        case "heading": {
          return addKey(<h3>{children}</h3>)
        }
        case "divider": {
          return addKey(<hr />)
        }
        case "italic": {
          return addKey(<em>{children}</em>)
        }
        case "bold": {
          return addKey(<strong>{children}</strong>)
        }
        case "link": {
          // NOTE: needs to be made relative wtih `makeRelative(href,domain)`
          return addKey(<Link to={node.data.href}>{children}</Link>)
        }
        case "image": {
          return addKey(
            <Picture
              readOnly={true}
              editor={{ value: { isFocused: false, isSelected: false } }}
              node={{
                data: {
                  get: object => node.data[object]
                }
              }}
              parent={{
                getNextBlock: nodeKey => {}
              }}
            />
          )
        }
        default:
          return addKey(<span>{children}</span>)
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

const toReact = (value, options = {}) => {
  const { document } = value
  const elements = document.nodes.map(serializeNode).filter(Boolean)
  return elements
}

const serializeNode = node => {
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

const serializeLeaf = leaf => {
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

const serializeString = string => {
  for (const rule of rules) {
    if (!rule.serialize) continue
    const ret = rule.serialize(string, string.text)
    if (ret) return ret
  }
}

const cruftNewline = element =>
  !(element.nodeName === "#text" && element.nodeValue == "\n")

let key = 0
const addKey = element => {
  const thisKey = key++
  return React.cloneElement(element, {
    key: thisKey,
    node: { ...element.props.node, get: object => object === "key" && thisKey }
  })
}

export default toReact
