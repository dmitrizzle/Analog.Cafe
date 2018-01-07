// tools
import Slate from "slate"

// return
// based on:
// https://github.com/GitbookIO/slate-trailing-block/blob/master/lib/index.js
export const TrailingBlock = options => {
  return {
    validateNode: node => {
      options = options || {}
      options.type = options.type || "paragraph"
      options.match = options.match || (node => node.type === options.type)

      if (node.kind !== "document") {
        return undefined
      }

      const lastNode = node.nodes.last()
      if (lastNode && options.match(lastNode)) {
        return undefined
      }

      const lastIndex = node.nodes.count()
      const block = Slate.Block.create({
        type: options.type,
        nodes: [Slate.Text.create()]
      })

      return change => change.insertNodeByKey(node.key, lastIndex, block)
    }
  }
}
