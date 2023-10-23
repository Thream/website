import useTranslation from "next-translate/useTranslation"
import type { Error } from "react-component-form"

const knownErrorKeywords = ["minLength", "maxLength", "format"]

const getErrorTranslationKey = (error: Error): string => {
  if (knownErrorKeywords.includes(error?.keyword)) {
    if (
      error.keyword === "minLength" &&
      typeof error.data === "string" &&
      error.data.length === 0
    ) {
      return "errors:required"
    }
    if (error.keyword === "format") {
      if (error.params["format"] === "email") {
        return "errors:invalid-email"
      }
      return "errors:invalid"
    }
    return `errors:${error.keyword}`
  }
  return "errors:invalid"
}

export type GetErrorTranslation = (
  error: Error | undefined,
) => string | undefined

export type GetFirstErrorTranslation = (
  errors: Error[] | undefined,
) => string | undefined

export interface UseFormTranslationResult {
  getErrorTranslation: GetErrorTranslation
  getFirstErrorTranslation: GetFirstErrorTranslation
}

export const useFormTranslation = (): UseFormTranslationResult => {
  const { t } = useTranslation()

  const getErrorTranslation: GetErrorTranslation = (error) => {
    if (error != null) {
      return t(getErrorTranslationKey(error)).replace(
        "{expected}",
        error?.params?.["limit"],
      )
    }
    return undefined
  }

  const getFirstErrorTranslation: GetFirstErrorTranslation = (errors) => {
    if (errors != null) {
      return getErrorTranslation(errors[0])
    }
    return undefined
  }

  return { getFirstErrorTranslation, getErrorTranslation }
}
