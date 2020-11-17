import { forwardRef, useMemo } from 'react'

import { ReactHTMLProps } from 'typings/utils'

type ButtonProps = ReactHTMLProps<HTMLInputElement> & {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { ...rest } = props

    return (
      <>
        <input className='switchCheckbox' id='switch' type='checkbox' />
        <label className='react-switch-label' htmlFor='switch'>
          <span className='switchButton' />
        </label>

        <style jsx>{``}</style>
      </>
    )
  }
)
