import { forwardRef } from 'react'

interface SwitchProps extends React.ComponentPropsWithRef<'input'> {
  handleClick?: React.MouseEventHandler<HTMLLabelElement>
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const { id = '', checked = false, handleClick, ...rest } = props

    return (
      <>
        <input
          ref={ref}
          {...rest}
          className='switch__checkbox'
          type='checkbox'
          defaultChecked={checked}
        />
        <label className='switch__label' htmlFor={id} onClick={handleClick}>
          <span className='switch__button' />
        </label>

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
              width: 38px;
              height: 14px;
              background: var(--color-secondary);
              border-radius: 100px;
              position: relative;
              transition: background-color 0.2s;
            }
            .switch__label .switch__button {
              content: '';
              position: absolute;
              top: -3px;
              left: 2px;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              transition: 0.2s;
              box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
            }
            .switch__label .switch__button:hover {
              opacity: 0.8;
            }
            .switch__checkbox:checked + .switch__label .switch__button {
              left: calc(100% - 2px);
              transform: translateX(-100%);
            }
            .switch__label:active .switch__button {
              width: 21px;
            }
            .switch__button {
              background: ${checked
                ? 'var(--color-primary)'
                : 'var(--color-secondary)'};
            }
          `}
        </style>
      </>
    )
  }
)
