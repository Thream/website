import { forwardRef, InputHTMLAttributes, MouseEvent } from 'react'

type RadioInput = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  handleClick?: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void
}

export const RadioInput = forwardRef<HTMLInputElement, RadioInput>(
  (props, ref) => {
    const { id = '', checked = false, handleClick, label, ...rest } = props

    return (
      <>
        <div className='RadioButton' onClick={handleClick}>
          <input ref={ref} {...rest} defaultChecked={checked} type='radio' />
          <label htmlFor={id}>{label}</label>
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
              border-color: var(--color-secondary);
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
              border: 2px solid var(--color-secondary);
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
