import type { ErrorObject } from 'ajv'

import { getErrorTranslationKey } from './getErrorTranslationKey'

const errorObject: ErrorObject = {
  instancePath: '/path',
  keyword: 'keyword',
  params: {},
  schemaPath: '/path'
}

describe('Authentication/getErrorTranslationKey', () => {
  it('returns `errors:invalid` with unknown keyword', async () => {
    expect(
      getErrorTranslationKey({
        ...errorObject,
        keyword: 'unknownkeyword'
      })
    ).toEqual('errors:invalid')
  })

  it('returns `errors:invalid` with format != email', () => {
    expect(
      getErrorTranslationKey({
        ...errorObject,
        keyword: 'format',
        params: { format: 'email' }
      })
    ).toEqual('errors:email')
  })

  it('returns `errors:email` with format = email', () => {
    expect(
      getErrorTranslationKey({
        ...errorObject,
        keyword: 'format',
        params: { format: 'email' }
      })
    ).toEqual('errors:email')
  })

  it('returns `errors:required` with minLength and limit = 1', () => {
    expect(
      getErrorTranslationKey({
        ...errorObject,
        keyword: 'minLength',
        params: { limit: 1 }
      })
    ).toEqual('errors:required')
  })

  it('returns `errors:minLength` with minLength and limit > 1', () => {
    expect(
      getErrorTranslationKey({
        ...errorObject,
        keyword: 'minLength',
        params: { limit: 5 }
      })
    ).toEqual('errors:minLength')
  })

  it('returns `errors:maxLength` with maxLength', () => {
    expect(
      getErrorTranslationKey({
        ...errorObject,
        keyword: 'maxLength',
        params: { limit: 5 }
      })
    ).toEqual('errors:maxLength')
  })
})
