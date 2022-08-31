import type { Handler } from '../../handler'

export const postUsersSigninHandler: Handler = {
  method: 'POST',
  url: '/users/signin',
  response: {
    statusCode: 200,
    body: {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      expiresIn: 3600000,
      type: 'Bearer'
    }
  }
}

export const postUsersSigninInvalidCredentialsHandler: Handler = {
  method: 'POST',
  url: '/users/signin',
  response: {
    statusCode: 400,
    body: {
      statusCode: 400,
      error: 'Bad Request',
      message: 'Invalid credentials.'
    }
  }
}
