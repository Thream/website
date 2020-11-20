import { forwardRef } from 'react'

import { ReactHTMLProps } from 'typings/utils'

type RadioInput = ReactHTMLProps<HTMLInputElement> & {
  id: string
  checked?: boolean
  value: string
  label: string
  handleChange?: any
}

export const RadioInput = forwardRef<HTMLDivElement, RadioInput>(
  (props, ref) => {
    const { checked, id, value, label, handleChange, ...rest } = props

    return (
      <>
        <div className='RadioButton'>
          <input
            id={id}
            onChange={handleChange}
            value={value}
            type='radio'
            checked={checked}
          />
          <label htmlFor={id}>{props.label}</label>
        </div>

        <style jsx>{``}</style>
      </>
    )
  }
)
