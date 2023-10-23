import { guildExample } from "../../guild"
import type { Handler } from "../../../handler"
import { channelExample, channelExample2 } from "../../../channels/channel"

export const postChannelsWithGuildIdHandler: Handler = {
  method: "POST",
  url: `/guilds/${guildExample.id}/channels`,
  response: {
    statusCode: 200,
    body: {
      ...channelExample2,
      defaultChannelId: channelExample.id,
    },
  },
}
