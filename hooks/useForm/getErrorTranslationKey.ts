import type { ErrorObject } from 'ajv'

const knownErrorKeywords = ['minLength', 'maxLength', 'format']

export const getErrorTranslationKey = (error: ErrorObject): string => {
  if (knownErrorKeywords.includes(error?.keyword)) {
    if (error.keyword === 'minLength' && error.params.limit === 1) {
      return 'errors:required'
    }
    if (error.keyword === 'format') {
      if (error.params.format === 'email') {
        return 'errors:email'
      }
      return 'errors:invalid'
    }
    return `errors:${error.keyword}`
  }
  return 'errors:invalid'
}
