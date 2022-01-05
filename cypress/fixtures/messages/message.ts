import { channelExample } from '../channels/channel'
import { memberExampleComplete } from '../members/member'

export const messageExample = {
  id: 1,
  value: 'Hello, world!',
  type: 'text' as 'text' | 'file',
  mimetype: 'text/plain',
  memberId: memberExampleComplete.id,
  channelId: channelExample.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const messageExampleComplete = {
  ...messageExample,
  member: memberExampleComplete
}

export const messageExampleComplete2 = {
  ...messageExampleComplete,
  id: 2,
  value: 'Message with bad html: <script>alert("xss")</script>'
}

export const messageExampleComplete3 = {
  ...messageExampleComplete,
  id: 3,
  value:
    'Message with **bold text** and *italic text*.\nNewlines and some emoji: :smile:'
}

export const messageExampleComplete4 = {
  ...messageExampleComplete,
  id: 4,
  value: `The Quadratic Formula:

**Theorem 1**: $(a, b, c) \\in \\mathbb{R}^3$, the solutions of $ax^2 + bx + c = 0$ are:

$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
  `
}
