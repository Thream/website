import type { Handler } from "../../handler"
import { guildExample, guildExample2 } from "../guild"

export const getGuildsPublicEmptyHandler: Handler = {
  method: "GET",
  url: "/guilds/public",
  response: {
    statusCode: 200,
    body: [],
  },
}

export const getGuildsPublicHandler: Handler = {
  method: "GET",
  url: "/guilds/public",
  response: {
    statusCode: 200,
    body: [
      { ...guildExample, membersCount: 1 },
      { ...guildExample2, membersCount: 1 },
    ],
  },
}

export const getGuildsPublicSearchHandler: Handler = {
  method: "GET",
  url: "/guilds/public",
  response: {
    statusCode: 200,
    body: [{ ...guildExample2, membersCount: 1 }],
  },
}
