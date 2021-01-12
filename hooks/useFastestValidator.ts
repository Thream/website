import { useState, useMemo } from 'react'
import Validator, { ValidationError, ValidationRule } from 'fastest-validator'

export type ValidationResult<T> = { [key in keyof T]: ValidationError[] }

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>

export interface UseValidatorResult<T> {
  validationResult: ValidationResult<T>
  setValidationResult: ReactSetState<ValidationResult<any>>
  validate: (value: any) => boolean
}

export type ValidatorSchema<T = any> = {
  [key in keyof T]: ValidationRule
}

export const useFastestValidator = <T = any>(
  validatorSchema: ValidatorSchema<T>
): UseValidatorResult<T> => {
  const emptyValidationResult = useMemo(() => {
    const result: ValidationResult<T> = {} as any
    for (const key in validatorSchema) {
      result[key] = []
    }
    return result
  }, [validatorSchema])

  const [validationResult, setValidationResult] = useState<ValidationResult<T>>(
    emptyValidationResult
  )

  const validator = useMemo(() => {
    return new Validator().compile(validatorSchema)
  }, [validatorSchema])

  const validate = (value: any): boolean => {
    const validationError = validator(value)
    if (!Array.isArray(validationError)) {
      setValidationResult(emptyValidationResult)
      return true
    }
    const result: ValidationResult<T> = {} as any
    validationError.forEach((error) => {
      if (result[error.field as keyof T] == null) {
        result[error.field as keyof T] = [error]
      } else {
        result[error.field as keyof T].push(error)
      }
    })
    setValidationResult(result)
    return false
  }

  return { validationResult, setValidationResult, validate }
}
