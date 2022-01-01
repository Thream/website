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
  ...messageExample,
  id: 2,
  value: 'Second message',
  member: memberExampleComplete
}
