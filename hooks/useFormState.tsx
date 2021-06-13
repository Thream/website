import { useState } from 'react'

export const formState = ['idle', 'loading', 'error', 'success'] as const

export type FormState = typeof formState[number]

export const useFormState = (
  initialFormState: FormState = 'idle'
): [
  formState: FormState,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
] => {
  const [formState, setFormState] = useState<FormState>(initialFormState)
  return [formState, setFormState]
}
