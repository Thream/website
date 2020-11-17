import { forwardRef } from 'react'

import { ReactHTMLProps } from 'typings/utils'

type SwitchProps = ReactHTMLProps<HTMLInputElement> & {}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (props, ref) => {
    const { ...rest } = props

    return (
      <>
        <div className='switch' {...rest}>
          <input
            className='switch__checkbox'
            id='switch__checkbox'
            type='checkbox'
          />
          <label className='switch__label' htmlFor='switch__checkbox'>
            <span className='switch__button' />
          </label>
        </div>

        <style jsx>
          {`
            .switch__checkbox {
              height: 0;
              width: 0;
              visibility: hidden;
            }

            .switch__label {
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              width: 85px;
              height: 35px;
              background: var(--color-primary-4);
              border-radius: 100px;
              position: relative;
              transition: background-color 0.2s;
            }

            .switch__label .switch__button {
              content: '';
              position: absolute;
              top: -7px;
              left: 2px;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              transition: 0.2s;
              background: var(--color-secondary);
              box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
            }

            .switch__checkbox:checked + .switch__label .switch__button {
              left: calc(100% - 2px);
              transform: translateX(-100%);
            }

            .switch__label:active .switch__button {
              width: 60px;
            }
          `}
        </style>
      </>
    )
  }
)
