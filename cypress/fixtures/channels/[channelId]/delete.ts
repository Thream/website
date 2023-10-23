import type { Handler } from "../../handler"
import { channelExample, channelExample2 } from "../channel"

export const deleteChannelWithChannelIdHandler: Handler = {
  method: "DELETE",
  url: `/channels/${channelExample.id}`,
  response: {
    statusCode: 200,
    body: {
      ...channelExample,
      defaultChannelId: channelExample2.id,
    },
  },
}
