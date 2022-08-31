import type { Handler } from '../../handler'

export const putUsersResetPasswordHandler: Handler = {
  method: 'PUT',
  url: '/users/reset-password',
  response: {
    statusCode: 200,
    body: 'The new password has been saved!'
  }
}

export const putUsersResetPasswordInvalidTemporaryTokenHandler: Handler = {
  method: 'PUT',
  url: '/users/reset-password',
  response: {
    statusCode: 400,
    body: {
      statusCode: 400,
      error: 'Bad Request',
      message: '"tempToken" is invalid'
    }
  }
}
