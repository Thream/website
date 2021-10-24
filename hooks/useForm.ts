import { useMemo, useState } from 'react'
import { FormDataObject, HandleForm } from 'react-component-form'
import useTranslation from 'next-translate/useTranslation'

import { FormState, useFormState } from 'hooks/useFormState'
import {
  GetErrorMessages,
  useFastestValidator,
  ValidatorSchema
} from 'hooks/useFastestValidator'
import { ValidationError } from 'fastest-validator'

export interface ErrorResponse {
  field?: string
  message: string
}

export interface UseFormOptions {
  validatorSchema: ValidatorSchema
}

export type HandleSubmit = (callback: HandleSubmitCallback) => HandleForm

export type HandleSubmitCallback = (
  formData: FormDataObject
) => Promise<string | null>

export interface UseFormResult {
  message: string | undefined
  formState: FormState
  getErrorMessages: GetErrorMessages
  handleChange: HandleForm
  handleSubmit: HandleSubmit
}

export const useForm = (options: UseFormOptions): UseFormResult => {
  const { validatorSchema } = options
  const { lang, t } = useTranslation()
  const errorsMessages = useMemo(() => {
    return {
      stringMin: t('errors:stringMin'),
      stringEmpty: t('errors:required'),
      emailEmpty: t('errors:required'),
      required: t('errors:required'),
      email: t('errors:email'),
      alreadyUsed: t('errors:alreadyUsed'),
      invalid: t('errors:invalid')
    }
  }, [lang])
  const [formState, setFormState] = useFormState()
  const {
    validate,
    getErrorMessages,
    addValidationErrors
  } = useFastestValidator(validatorSchema, {
    messages: errorsMessages
  })
  const [message, setMessage] = useState<string | undefined>(undefined)

  const handleChange: HandleForm = (formData) => {
    if (formState !== 'error') {
      setMessage(undefined)
    }
    const isValid = validate(formData)
    setFormState(!isValid ? 'error' : 'idle')
  }

  const handleSubmit = (callback: HandleSubmitCallback): HandleForm => {
    return async (formData, formElement) => {
      const isValid = validate(formData)
      if (isValid) {
        setFormState('loading')
        try {
          const successMessage = await callback(formData)
          if (successMessage != null) {
            setMessage(successMessage)
            setFormState('success')
            formElement.reset()
          }
        } catch (error) {
          if (error.response == null) {
            setFormState('error')
            setMessage(t('errors:server-error'))
            return
          }
          const errors = error.response.data.errors as ErrorResponse[]
          const validationErrors: ValidationError[] = []
          for (const error of errors) {
            if (error.field != null) {
              if (error.message.endsWith('already used')) {
                validationErrors.push({
                  type: 'alreadyUsed',
                  field: error.field
                })
              } else {
                validationErrors.push({
                  type: 'invalid',
                  field: error.field
                })
              }
            } else {
              setFormState('error')
              setMessage(error.message)
              break
            }
          }
          addValidationErrors(validationErrors)
          setFormState('error')
        }
      } else {
        setMessage(undefined)
        setFormState('error')
      }
    }
  }

  return { message, formState, getErrorMessages, handleChange, handleSubmit }
}
