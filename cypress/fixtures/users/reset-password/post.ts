import type { Handler } from "../../handler"

export const postUsersResetPasswordHandler: Handler = {
  method: "POST",
  url: "/users/reset-password",
  response: {
    statusCode: 200,
    body: "Password-reset request successful, please check your emails!",
  },
}
