import { useMemo } from 'react'
import Form from 'react-component-form'

import { Button } from 'components/design/Button'
import { Input } from 'components/design/Input'

interface AuthenticationFormProps extends React.HTMLProps<HTMLDivElement> {
  isSignup?: boolean
}

export const AuthenticationForm: React.FC<AuthenticationFormProps> = props => {
  const { isSignup = false, ...rest } = props

  const authenticationFormPosition = useMemo(
    () => (isSignup ? 'left: 46%; top: 8%;' : 'left: 29%; top:10%;'),
    [isSignup]
  )

  return (
    <>
      <div className='AuthenticationForm' {...rest}>
        <h1 className='AuthenticationForm__title'>
          {isSignup ? 'Sign up' : 'Sign in'}
        </h1>

        <div className='btn-group'>
          <Button socialMediaType='github'>Github</Button>
          <Button socialMediaType='twitter'>Twitter</Button>
        </div>

        <div className='btn-group'>
          <Button socialMediaType='discord'>Discord</Button>
          <Button socialMediaType='google'>Google</Button>
        </div>

        <span className='AuthenticationForm__seperator'>OR</span>

        <Form>
          {isSignup && (
            <Input groupMargin={1} type='name' name='name' label='Name' />
          )}

          <Input
            autoComplete='username'
            type='email'
            name='email'
            label='Email'
          />

          <Input
            autoComplete='current-password'
            type='password'
            label='Password'
            state='togglePassword'
            name='password'
          />

          <Button type='large'> {isSignup ? 'Create' : 'Get in'}</Button>
        </Form>

        {isSignup && (
          <a className='AuthenticationForm__link' href='#'>
            Forgot password ?
          </a>
        )}
      </div>

      <style jsx>
        {`
          .AuthenticationForm {
            position: absolute;
            ${authenticationFormPosition}
            padding: 1rem 4.5rem 6rem 4.5rem;
            border-radius: 2rem;
            background: linear-gradient(
              165.58deg,
              var(--color-grey-light-5) 8.4%,
              var(--color-secondary-dark) 99.52%
            );
            box-shadow: 0px 0.4rem 3rem rgba(0, 0, 0, 0.25);
          }

          .btn-group {
            display: flex;
            justify-content: space-between;
            margin-top: 1.8rem;
          }

          .AuthenticationForm__title {
            padding: 2rem;
            text-align: center;
            color: #fff;
            font-size: 3rem;
            font-weight: 500;
            margin: 1.2rem 0;
          }
          .AuthenticationForm__seperator {
            text-align: center;
            display: inline-block;
            width: 100%;
            font-weight: 200;
            margin: 2.4rem 0;
            color: var(--color-grey-light-4);
          }
          .AuthenticationForm__seperator::before,
          .AuthenticationForm__seperator::after {
            content: '';
            display: inline-block;
            height: 0.5px;
            width: 4.5rem;
            background: var(--color-grey-light-4);
            margin: 5px 11px;
          }
          .AuthenticationForm__link {
            color: var(--color-grey-light-4);
            font-size: 1.2rem;
            font-weight: 200;
            text-decoration: none;
            margin: 1rem 0;
            display: inline-block;
          }
          .AuthenticationForm__link:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </>
  )
}
