import { forwardRef, useState, useCallback, useMemo } from 'react'
import classNames from 'classnames'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  label: string
  state?: 'success' | 'error' | 'togglePassword'
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, state, type = 'text', ...rest } = props
  const [inputType, setInputType] = useState(type)
  const [hasInputValue, setHasInputValue] = useState(false)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.target.value.length >= 1 && !hasInputValue) {
        setHasInputValue(true)
      } else if (event.target.value.length === 0 && hasInputValue) {
        setHasInputValue(false)
      }
    },
    [hasInputValue]
  )

  const handleTogglePassword = useCallback(() => {
    const type = inputType === 'text' ? 'password' : 'text'
    setInputType(type)
  }, [inputType])

  const inputClassList = useMemo(() => {
    const classList = ['input']
    if (state != null) {
      classList.push(`input--${state}`)
    }
    return classList.join(' ')
  }, [state])

  return (
    <>
      <div className='group'>
        <input
          onChange={handleChange}
          ref={ref}
          type={inputType}
          {...rest}
          id={props.name}
          className={inputClassList}
        />
        {state != null && (
          <img
            onClick={
              state === 'togglePassword' ? handleTogglePassword : undefined
            }
            className='input__img'
            src={`/images/svg/input/${
              state === 'togglePassword' ? inputType : state
            }.svg`}
            alt={state}
          />
        )}
        <label
          className={classNames('input__label', {
            shrink: hasInputValue
          })}
          htmlFor={props.name}
        >
          {label}
        </label>
      </div>

      <style jsx>
        {`
          .group {
            position: relative;
            margin: 3rem 0;
          }
          .input {
            background: none;
            background-color: var(--color-secondary);
            padding: 1rem 1rem 1rem 0.9rem;
            line-height: 1;
            display: block;
            border: none;
            border-radius: 4px;
            outline: none;
            overflow-x: hidden;
            padding-right: 32px;
          }
          .input__img {
            width: 18px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 12px;
            display: none;
            padding-left: 5px;
            background-color: var(--color-secondary);
          }
          .input:focus ~ .input__label {
            top: -1.6rem;
            color: white;
            font-size: 1.3rem;
            left: 0px;
          }
          .input__label {
            font-size: 16px;
            color: var(--color-tertiary);
            font-weight: normal;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            left: ${hasInputValue ? '0px' : '10px'};
            text-transform: capitalize;
            transition: 300ms ease all;
          }
          .input__label.shrink {
            top: -1.6rem;
            padding: 1px;
            color: #fff;
            font-size: 1.3rem;
          }
          .input--success {
            border: 2px solid var(--color-success);
          }
          .input--error {
            border: 2px solid var(--color-error);
          }
          .input--success + .input__img,
          .input--error + .input__img,
          .input--togglePassword + .input__img {
            display: block;
          }
          .input--togglePassword + .input__img {
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
})
