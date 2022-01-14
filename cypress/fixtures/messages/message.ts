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

export const messageExampleComplete5 = {
  ...messageExampleComplete,
  id: 5,
  value: ':wave:'
}

export const messageExampleComplete6 = {
  ...messageExampleComplete,
  id: 6,
  value: '/uploads/messages/image.png',
  type: 'file',
  mimetype: 'image/png'
}

export const messageExampleComplete7 = {
  ...messageExampleComplete,
  id: 7,
  value: '/uploads/messages/audio.mp3',
  type: 'file',
  mimetype: 'audio/mp3'
}

export const messageExampleComplete8 = {
  ...messageExampleComplete,
  id: 8,
  value: '/uploads/messages/video.mp4',
  type: 'file',
  mimetype: 'video/mp4'
}

export const messageExampleComplete9 = {
  ...messageExampleComplete,
  id: 9,
  value: '/uploads/messages/download.zip',
  type: 'file',
  mimetype: 'application/zip'
}
