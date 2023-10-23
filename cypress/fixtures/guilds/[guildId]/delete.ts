import type { Handler } from "../../handler"
import { guildExample } from "../guild"

export const deleteGuildWithGuildIdHandler: Handler = {
  method: "DELETE",
  url: `/guilds/${guildExample.id}`,
  response: {
    statusCode: 200,
    body: {
      ...guildExample,
    },
  },
}
