import type { Handler } from "../../handler"
import { channelExample, channelExample2 } from "../channel"

export const putChannelWithChannelIdHandler: Handler = {
  method: "PUT",
  url: `/channels/${channelExample.id}`,
  response: {
    statusCode: 200,
    body: {
      ...channelExample,
      name: "New channel name",
      defaultChannelId: channelExample2.id,
    },
  },
}
