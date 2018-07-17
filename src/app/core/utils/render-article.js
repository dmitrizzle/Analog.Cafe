import React from "react"

import Link from "../components/controls/Link"
import Picture from "../components/vignettes/Picture"

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
          return addKey(<Link to={node.data.href}>{children}</Link>)
        }
        case "image": {
          return addKey(
            <Picture
              editor={{ value: { isFocused: false, isSelected: false } }}
              node={{
                data: {
                  get: object => node.data[object]
                },
                serial: node.serial
              }}
              readOnly={true}
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
          if (i !== 0) array.push(<br key={i} />)
          array.push(text)
          return array
        }, [])
      }
    }
  }
]

const addRootSerialNumbers = nodes => {
  nodes.forEach((node, iterator) => {
    node.serial = iterator
  })
  return nodes
}
let nodes = []
const toReact = (value, options = {}) => {
  const { document } = value
  nodes = addRootSerialNumbers(document.nodes)
  const elements = nodes.map(serializeNode).filter(Boolean)
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
      if (ret === null) return null
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

let key = 0
const addKey = element => {
  const thisKey = key++
  return React.cloneElement(element, {
    key: thisKey,
    node: element.props.node
      ? {
          ...element.props.node,
          get: object => {
            return object === "key" && thisKey
          }
        }
      : null,
    parent: {
      getNextBlock: () => {
        const node = nodes.filter(object => {
          return object.serial === element.props.node.serial + 1
        })[0]
        const nodeFunction = {
          get: object =>
            object === "data" && {
              get: object => (node.data ? node.data[object] : undefined)
            }
        }
        console.log(
          element.props.node.data.get("feature"),
          nodeFunction.get("data").get("feature")
        )
        return nodeFunction
      }
    }
  })
}

export default toReact
