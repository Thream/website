import { useState, useMemo } from 'react'
import Validator, { ValidationError, ValidationRule } from 'fastest-validator'

export type ValidationResult<T> = { [key in keyof T]: ValidationError[] }

export interface UseValidatorResult<T> {
  validationResult: ValidationResult<T>
  setValidationResult: (validationError: ValidationError[]) => void
  getErrorMessages: (key: keyof T) => string[]
  validate: (value: any) => boolean
}

export type ValidatorSchema<T = any> = {
  [key in keyof T]: ValidationRule
}

export const useFastestValidator = <T = any>(
  validatorSchema: ValidatorSchema<T>,
  defaultErrorMessage: string = 'Invalid value.'
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

  const emptyValidationResult = useMemo(() => {
    return fillEmptyValidation()
  }, [validatorSchema])

  const [validationResult, setValidation] = useState<ValidationResult<T>>(
    emptyValidationResult
  )

  const validator = useMemo(() => {
    return new Validator().compile(validatorSchema)
  }, [validatorSchema])

  const validate = (value: any): boolean => {
    const validationError = validator(value)
    if (!Array.isArray(validationError)) {
      setValidation(emptyValidationResult)
      return true
    }
    setValidationResult(validationError)
    return false
  }

  const setValidationResult = (validationError: ValidationError[]): void => {
    const result: ValidationResult<T> = {} as any
    validationError.forEach((error) => {
      if (result[error.field as keyof T] == null) {
        result[error.field as keyof T] = [error]
      } else {
        result[error.field as keyof T].push(error)
      }
    })
    const finalResult = fillEmptyValidation(result)
    setValidation(finalResult)
  }

  const getErrorMessages = (key: keyof T): string[] => {
    return validationResult[key].map(
      (error) => error?.message ?? defaultErrorMessage
    )
  }

  return {
    validationResult,
    setValidationResult,
    getErrorMessages,
    validate
  }
}
