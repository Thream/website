import { forwardRef } from 'react'

interface RadioInputProps extends React.ComponentPropsWithRef<'input'> {
  label: string
  handleClick?: React.MouseEventHandler<HTMLDivElement>
}

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  (props, ref) => {
    const { id = '', checked = false, handleClick, label, ...rest } = props

    return (
      <>
        <div className='button' onClick={handleClick}>
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
            .button {
              margin: 16px 0;
            }
            .button input[type='radio'] {
              display: none;
            }
            .button input[type='radio']:checked + label:before {
              border-color: var(--color-primary);
              animation: ripple 0.2s linear forwards;
            }
            .button input[type='radio']:checked + label:after {
              transform: scale(1);
            }
            .button label {
              display: inline-block;
              height: 20px;
              position: relative;
              padding: 0 30px;
              margin-bottom: 0;
              cursor: pointer;
              vertical-align: bottom;
            }
            .button label:before,
            .button label:after {
              position: absolute;
              content: '';
              border-radius: 50%;
              transition: all 0.3s ease;
              transition-property: transform, border-color;
            }
            .button label:before {
              left: 0;
              top: 0;
              width: 20px;
              height: 20px;
              border: 2px solid var(--color-primary);
            }
            .button label:after {
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
