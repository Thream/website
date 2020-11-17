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
              width: 100px;
              height: 50px;
              background: grey;
              border-radius: 100px;
              position: relative;
              transition: background-color 0.2s;
            }

            .switch__label .switch__button {
              content: '';
              position: absolute;
              top: 2px;
              left: 2px;
              width: 45px;
              height: 45px;
              border-radius: 45px;
              transition: 0.2s;
              background: #fff;
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
