import type { Handler } from "../../handler"
import { guildExample } from "../guild"
import { memberExampleComplete } from "../../members/member"

export const getGuildMemberWithGuildIdHandler: Handler = {
  method: "GET",
  url: `/guilds/${guildExample.id}`,
  response: {
    statusCode: 200,
    body: {
      guild: guildExample,
      member: memberExampleComplete,
    },
  },
}

export const getGuildMemberNotOwnerWithGuildIdHandler: Handler = {
  method: "GET",
  url: `/guilds/${guildExample.id}`,
  response: {
    statusCode: 200,
    body: {
      guild: guildExample,
      member: {
        ...memberExampleComplete,
        isOwner: false,
      },
    },
  },
}
