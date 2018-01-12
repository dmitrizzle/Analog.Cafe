// tools
import { Block } from "slate"
import keycode from "keycode"

export const LeadingBlock = options => {
  return {
    validateNode(node) {
      if (!node.nodes) return
      // Rule to ensure a default block above void node.
      const voidAboveIndexes = node.nodes.reduce((arr, child, index) => {
        if (child.isVoid) {
          const prevNode = index > 0 ? node.nodes.get(index - 1) : null
          if (!prevNode || prevNode.isVoid) {
            arr.push(index)
          }
        }
        return arr
      }, [])

      if (voidAboveIndexes.length) {
        return change => {
          const { value } = change
          if (value.focusBlock.type !== "image") return

          voidAboveIndexes.reverse().forEach(index => {
            change.insertNodeByKey(node.key, index, Block.create("paragraph"))
          })
          return change
        }
      }
    }
  }
}

// Error: A schema rule could not be validated after sufficient iterations.
// This is usually due to a `rule.validate` or `rule.normalize` function of a
// schema being incorrectly written, causing an infinite loop.
