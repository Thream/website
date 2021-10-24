import { useState, useMemo, useEffect } from 'react'
import Validator, {
  ValidationError,
  ValidationRule,
  ValidatorConstructorOptions
} from 'fastest-validator'
import useTranslation from 'next-translate/useTranslation'

export type ValidationResult<T> = { [key in keyof T]: ValidationError[] }

export type AddValidationErrors = (validationErrors: ValidationError[]) => void

export type GetErrorMessages<T = any> = (key: keyof T) => string[]

export type Validate = (value: any) => boolean

export interface UseValidatorResult<T> {
  validationResult: ValidationResult<T>
  addValidationErrors: AddValidationErrors
  getErrorMessages: GetErrorMessages<T>
  validate: Validate
}

export type ValidatorSchema<T = any> = {
  [key in keyof T]: ValidationRule
}

const getErrorMessage = (error: ValidationError, message?: string): string => {
  if (error.message == null || message == null) {
    return error.type
  }
  return message
    .replace('{field}', error.field)
    .replace('{expected}', error.expected)
}

export const useFastestValidator = <T = any>(
  validatorSchema: ValidatorSchema<T>,
  validatorOptions?: ValidatorConstructorOptions
): UseValidatorResult<T> => {
  const fillEmptyValidation = (
    result: ValidationResult<T> = {} as any
  ): ValidationResult<T> => {
    for (const key in validatorSchema) {
      if (result[key] == null) {
        result[key] = []
      }
    }
    return result
  }

  const { lang } = useTranslation()

  const emptyValidationResult = useMemo(() => {
    return fillEmptyValidation()
  }, [validatorSchema])

  useEffect(() => {
    const result = { ...validationResult }
    for (const key in result) {
      result[key] = result[key].map((error) => {
        if (validatorOptions?.messages != null) {
          error.message = getErrorMessage(
            error,
            validatorOptions.messages[error.type]
          )
        }
        return error
      })
    }
    setValidation(result)
  }, [lang])

  const [validationResult, setValidation] = useState<ValidationResult<T>>(
    emptyValidationResult
  )

  const validator = useMemo(() => {
    return new Validator(validatorOptions).compile(validatorSchema)
  }, [validatorOptions, validatorSchema])

  const validate: Validate = (value) => {
    const validationErrors = validator(value)
    if (!Array.isArray(validationErrors)) {
      setValidation(emptyValidationResult)
      return true
    }
    setValidationResult(validationErrors)
    return false
  }

  const setValidationResult = (
    validationErrors: ValidationError[],
    validationResult: ValidationResult<T> = {} as any
  ): void => {
    const result: ValidationResult<T> = validationResult
    validationErrors.forEach((error) => {
      if (result[error.field as keyof T] == null) {
        result[error.field as keyof T] = [error]
      } else {
        result[error.field as keyof T].push(error)
      }
    })
    const finalResult = fillEmptyValidation(result)
    setValidation(finalResult)
  }

  const addValidationErrors: AddValidationErrors = (validationErrors) => {
    const result: ValidationResult<T> = { ...validationResult }
    validationErrors.map((error) => {
      if (validatorOptions?.messages != null) {
        error.message = validatorOptions.messages[error.type]
      }
    })
    setValidationResult(validationErrors, result)
  }

  const getErrorMessages: GetErrorMessages<T> = (key) => {
    return validationResult[key].map((error) => {
      return getErrorMessage(error, error.message)
    })
  }

  return {
    validationResult,
    addValidationErrors,
    getErrorMessages,
    validate
  }
}
