import { useState } from 'react'
import { FormDataObject, HandleForm } from 'react-component-form'

import { FormState, useFormState } from 'hooks/useFormState'
import { useFastestValidator, ValidatorSchema } from 'hooks/useFastestValidator'
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
  getErrorMessages: (key: string) => string[]
  handleChange: HandleForm
  handleSubmit: HandleSubmit
}

export const useForm = (options: UseFormOptions): UseFormResult => {
  const { validatorSchema } = options

  const [formState, setFormState] = useFormState()
  const {
    validate,
    getErrorMessages,
    setValidationResult
  } = useFastestValidator(validatorSchema)
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
          const errors = error.response.data.errors as ErrorResponse[]
          const validationErrors: ValidationError[] = []
          for (const error of errors) {
            if (error.field != null) {
              if (error.message.endsWith('already used')) {
                validationErrors.push({
                  type: 'alreadyExists',
                  field: error.field,
                  message: error.message
                })
              } else {
                validationErrors.push({
                  type: 'invalid',
                  field: error.field,
                  message: error.message
                })
              }
            } else {
              setFormState('error')
              setMessage(error.message)
              break
            }
          }
          setValidationResult(validationErrors)
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
