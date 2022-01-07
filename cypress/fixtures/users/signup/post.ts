import { Handler } from '../../handler'
import { userExample, userSettingsExample } from '../user'

export const postUsersSignupHandler: Handler = {
  method: 'POST',
  url: '/users/signup',
  response: {
    statusCode: 201,
    body: {
      user: {
        ...userExample,
        settings: userSettingsExample
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
