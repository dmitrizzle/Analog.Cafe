import React from "react"
import { RULES } from "./rules" // What you normally feed slate-html-serializer

const rules = [
  ...RULES,
  // from slate-html-serializer
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
