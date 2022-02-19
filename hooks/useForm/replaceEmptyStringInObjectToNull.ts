import type { ObjectAny } from '../../tools/types'

export const replaceEmptyStringInObjectToNull = (
  object: ObjectAny,
  required: string[] = []
): ObjectAny => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (
        typeof value === 'string' &&
        value.length === 0 &&
        !required.includes(key)
      ) {
        return [key, null]
      }
      return [key, value]
    })
  )
}
