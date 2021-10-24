import visit from 'unist-util-visit'
import { Plugin, Transformer } from 'unified'
import { Node } from 'unist'
import { EmojiSet } from 'emoji-mart'

export const emojiSet: EmojiSet = 'twitter'

export const emojiRegex = /:\+1:|:-1:|:[\w-]+:/

export const isStringWithOnlyOneEmoji = (value: string): boolean => {
  const result = emojiRegex.exec(value)
  return result != null && result.input === result[0]
}

const extractText = (string: string, start: number, end: number): Node => {
  const startLine = string.slice(0, start).split('\n')
  const endLine = string.slice(0, end).split('\n')
  return {
    type: 'text',
    value: string.slice(start, end),
    position: {
      start: {
        line: startLine.length,
        column: startLine[startLine.length - 1].length + 1
      },
      end: {
        line: endLine.length,
        column: endLine[endLine.length - 1].length + 1
      }
    }
  }
}

export const emojiPlugin: Plugin = () => {
  const transformer: Transformer = (tree) => {
    visit(tree, 'text', (node, position, parent) => {
      if (typeof node.value !== 'string') {
        return
      }
      const definition: Node[] = []
      let lastIndex = 0
      const match = emojiRegex.exec(node.value)
      if (match != null) {
        const value = match[0]
        if (match.index !== lastIndex) {
          definition.push(extractText(node.value, lastIndex, match.index))
        }
        definition.push({ type: 'emoji', value })
        lastIndex = match.index + value.length
        if (lastIndex !== node.value.length) {
          definition.push(extractText(node.value, lastIndex, node.value.length))
        }
        if (parent != null) {
          const last = parent.children.slice(position + 1)
          parent.children = parent.children.slice(0, position)
          parent.children = parent.children.concat(definition)
          parent.children = parent.children.concat(last)
        }
      }
    })
  }
  return transformer
}
