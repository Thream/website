import type { Handler } from "../../handler"
import { userExample, userSettingsExample } from "../user"

export const getUsersCurrentHandler: Handler = {
  method: "GET",
  url: "/users/current",
  response: {
    statusCode: 200,
    body: {
      user: {
        ...userExample,
        settings: userSettingsExample,
        currentStrategy: "local",
        strategies: ["local"],
      },
    },
  },
}
