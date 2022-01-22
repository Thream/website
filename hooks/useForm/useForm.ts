import { useMemo, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Type } from '@sinclair/typebox'
import type { FormDataObject, HandleForm } from 'react-component-form'
import type { ErrorObject } from 'ajv'

import { FetchState, useFetchState } from '../useFetchState'
import { ajv } from '../../tools/ajv'
import { getErrorTranslationKey } from './getErrorTranslationKey'
import { replaceEmptyStringInObjectToNull } from '../../tools/utils/replaceEmptyStringInObjectToNull'

interface Errors {
  [key: string]: ErrorObject<string, any> | null | undefined
}

const findError = (
  field: string
): ((value: ErrorObject, index: number, object: ErrorObject[]) => boolean) => {
  return (validationError) => validationError.instancePath === field
}

export type GetErrorTranslation = (error?: ErrorObject | null) => string | null

export interface UseFormOptions {
  validateSchema: { [key: string]: any }
  replaceEmptyStringToNull?: boolean
}

export type HandleSubmit = (callback: HandleSubmitCallback) => HandleForm

interface Message {
  type: 'error' | 'success'
  value: string
}

export type HandleSubmitCallback = (
  formData: FormDataObject,
  formElement: HTMLFormElement
) => Promise<Message | null>

export interface UseFormResult {
  message: string | null
  fetchState: FetchState
  getErrorTranslation: GetErrorTranslation
  handleSubmit: HandleSubmit
  errors: Errors
}

export const useForm = (options: UseFormOptions): UseFormResult => {
  const { validateSchema, replaceEmptyStringToNull = false } = options
  const { t } = useTranslation()
  const [fetchState, setFetchState] = useFetchState()
  const [messageTranslationKey, setMessageTranslationKey] = useState<
    string | undefined
  >(undefined)
  const [errors, setErrors] = useState<Errors>({})

  const validateSchemaObject = useMemo(() => {
    return Type.Object(validateSchema)
  }, [validateSchema])

  const validate = useMemo(() => {
    return ajv.compile(validateSchemaObject)
  }, [validateSchemaObject])

  const getErrorTranslation = (error?: ErrorObject | null): string | null => {
    if (error != null) {
      return t(getErrorTranslationKey(error)).replace(
        '{expected}',
        error?.params?.limit
      )
    }
    return null
  }

  const handleSubmit: HandleSubmit = (callback) => {
    return async (formData, formElement) => {
      console.log(formData)
      if (replaceEmptyStringToNull) {
        formData = replaceEmptyStringInObjectToNull(
          formData,
          validateSchemaObject.required
        )
      }
      console.log(validateSchemaObject)
      const isValid = validate(formData)
      if (!isValid) {
        setFetchState('error')
        const errors: Errors = {}
        for (const property in validateSchemaObject.properties) {
          errors[property] = validate.errors?.find(findError(`/${property}`))
        }
        setErrors(errors)
      } else {
        setErrors({})
        setFetchState('loading')
        const message = await callback(formData, formElement)
        if (message != null) {
          setMessageTranslationKey(message.value)
          if (message.type === 'success') {
            setFetchState('success')
            formElement.reset()
          } else {
            setFetchState('error')
          }
        }
      }
    }
  }

  return {
    getErrorTranslation,
    errors,
    fetchState,
    handleSubmit,
    message: messageTranslationKey != null ? t(messageTranslationKey) : null
  }
}
