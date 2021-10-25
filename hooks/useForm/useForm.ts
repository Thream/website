import { useMemo, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Type } from '@sinclair/typebox'
import type { FormDataObject, HandleForm } from 'react-component-form'
import type { ErrorObject } from 'ajv'

import { FormState, useFormState } from '../useFormState'
import { ajv } from '../../utils/ajv'
import { getErrorTranslationKey } from './getErrorTranslationKey'

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
  validateSchemaObject: { [key: string]: any }
}

export type HandleSubmit = (callback: HandleSubmitCallback) => HandleForm

interface Message {
  type: 'error' | 'success'
  value: string
}

export type HandleSubmitCallback = (
  formData: FormDataObject
) => Promise<Message | null>

export interface UseFormResult {
  message: string | null
  formState: FormState
  getErrorTranslation: GetErrorTranslation
  handleSubmit: HandleSubmit
  errors: Errors
}

export const useForm = (options: UseFormOptions): UseFormResult => {
  const { validateSchemaObject } = options
  const { t } = useTranslation()
  const [formState, setFormState] = useFormState()
  const [messageTranslationKey, setMessageTranslationKey] = useState<
    string | undefined
  >(undefined)
  const [errors, setErrors] = useState<Errors>({})

  const validateSchema = useMemo(() => {
    return Type.Object(validateSchemaObject)
  }, [validateSchemaObject])

  const validate = useMemo(() => {
    return ajv.compile(validateSchema)
  }, [validateSchema])

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
      const isValid = validate(formData)
      if (!isValid) {
        setFormState('error')
        const errors: Errors = {}
        for (const property in validateSchema.properties) {
          errors[property] = validate.errors?.find(findError(`/${property}`))
        }
        setErrors(errors)
      } else {
        setErrors({})
        setFormState('loading')
        const message = await callback(formData)
        if (message != null) {
          setMessageTranslationKey(message.value)
          if (message.type === 'success') {
            setFormState('success')
            formElement.reset()
          } else {
            setFormState('error')
          }
        }
      }
    }
  }

  return {
    getErrorTranslation,
    errors,
    formState,
    handleSubmit,
    message: messageTranslationKey != null ? t(messageTranslationKey) : null
  }
}
