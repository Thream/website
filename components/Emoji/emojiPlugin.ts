import { visit } from 'unist-util-visit'
import type { Plugin, Transformer } from 'unified'
import type { Literal, Parent } from 'unist'
import type { ElementContent } from 'hast'
import type { EmojiSet } from 'emoji-mart'

import { emojiRegex } from './isStringWithOnlyOneEmoji'

export const EMOJI_SET: EmojiSet = 'twitter'

const extractText = (
  string: string,
  start: number,
  end: number
): ElementContent => {
  return {
    type: 'text',
    value: string.slice(start, end)
  }
}

export const emojiPlugin: Plugin<[], Literal<string>> = () => {
  const transformer: Transformer<Literal<string>> = (tree) => {
    visit<Literal<string>, string>(
      tree,
      'text',
      (node, position, parent: Parent<ElementContent> | null) => {
        if (typeof node.value !== 'string') {
          return
        }
        position = position ?? 0
        const definition: ElementContent[] = []
        let lastIndex = 0
        const match = emojiRegex.exec(node.value)
        if (match != null) {
          const value = match[0]
          if (match.index !== lastIndex) {
            definition.push(extractText(node.value, lastIndex, match.index))
          }
          definition.push({
            type: 'element',
            tagName: 'emoji',
            properties: { value },
            children: []
          })
          lastIndex = match.index + value.length
          if (lastIndex !== node.value.length) {
            definition.push(
              extractText(node.value, lastIndex, node.value.length)
            )
          }
          if (parent != null) {
            const last = parent.children.slice(position + 1)
            parent.children = parent.children.slice(0, position)
            parent.children = parent.children.concat(definition)
            parent.children = parent.children.concat(last)
          }
        }
      }
    )
  }
  return transformer
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      emoji: { value: string }
    }
  }
}
