import { Handler } from '../../handler'

import { user, userSettings } from '../user'

export const postUsersSignupHandler: Handler = {
  method: 'POST',
  url: '/users/signup',
  response: {
    statusCode: 201,
    body: {
      user: {
        ...user,
        settings: userSettings
      }
    }
  }
}

export const postUsersSignupAlreadyUsedHandler: Handler = {
  method: 'POST',
  url: '/users/signup',
  response: {
    statusCode: 400,
    body: {
      statusCode: 400,
      error: 'Bad Request',
      message: 'body.email or body.name already taken.'
    }
  }
}
