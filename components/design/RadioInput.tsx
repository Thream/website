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
        <div ref={ref} {...rest} className='RadioButton'>
          <input
            id={id}
            onChange={handleChange}
            value={value}
            type='radio'
            checked={checked}
          />
          <label htmlFor={id}>{props.label}</label>
        </div>

        <style jsx>
          {`
            @keyframes ripple {
              0% {
                box-shadow: 0px 0px 0px 1px transparent;
              }

              50% {
                box-shadow: 0px 0px 0px 15px rgba(255, 255, 255, 0.1);
              }

              100% {
                box-shadow: 0px 0px 0px 15px transparent;
              }
            }

            .RadioButton {
              margin: 16px 0;
            }

            .RadioButton input[type='radio'] {
              display: none;
            }

            .RadioButton input[type='radio']:checked + label:before {
              border-color: #429d89;
              animation: ripple 0.2s linear forwards;
            }

            .RadioButton input[type='radio']:checked + label:after {
              transform: scale(1);
            }

            .RadioButton label {
              display: inline-block;
              height: 20px;
              position: relative;
              padding: 0 30px;
              margin-bottom: 0;
              cursor: pointer;
              vertical-align: bottom;
            }

            .RadioButton label:before,
            .RadioButton label:after {
              position: absolute;
              content: '';
              border-radius: 50%;
              transition: all 0.3s ease;
              transition-property: transform, border-color;
            }

            .RadioButton label:before {
              left: 0;
              top: 0;
              width: 20px;
              height: 20px;
              border: 2px solid #429d89;
            }

            .RadioButton label:after {
              top: 5px;
              left: 5px;
              width: 10px;
              height: 10px;
              transform: scale(0);
              background: #ffff;
            }
          `}
        </style>
      </>
    )
  }
)
