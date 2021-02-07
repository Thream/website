import Link from 'next/link'

import { Input } from 'components/design/Input'
import { FormState } from 'components/Authentication/FormState'
import { ValidatorSchema } from 'hooks/useFastestValidator'
import { AuthenticationProps } from '.'
import { AuthenticationFormLayout } from './AuthenticationFormLayout'
import { useForm } from 'hooks/useForm'

export const emailSchema: ValidatorSchema = {
  email: {
    type: 'email',
    empty: false,
    trim: true,
    messages: {
      emailEmpty: 'Oops, this field is required 🙈.',
      email: 'Mmm… It seems that this email is not valid 🤔.'
    }
  }
}

export const nameSchema: ValidatorSchema = {
  name: {
    type: 'string',
    min: 3,
    max: 30,
    trim: true,
    messages: {
      stringEmpty: 'Oops, this field is required 🙈.',
      stringMin: 'The {field} must contain at least {expected} characters.'
    }
  }
}

export const passwordSchema: ValidatorSchema = {
  password: {
    type: 'string',
    empty: false,
    trim: true,
    messages: {
      stringEmpty: 'Oops, this field is required 🙈.'
    }
  }
}

export const AuthenticationForm: React.FC<AuthenticationProps> = (props) => {
  const { mode, onSubmit } = props

  const {
    getErrorMessages,
    formState,
    message,
    handleChange,
    handleSubmit
  } = useForm({
    validatorSchema: {
      ...(mode === 'signup' && { ...nameSchema }),
      ...emailSchema,
      ...passwordSchema
    }
  })

  return (
    <>
      <AuthenticationFormLayout
        onChange={handleChange}
        onSubmit={handleSubmit(onSubmit)}
        link={
          <p>
            <Link href={mode === 'signup' ? '/authentication/signin' : '/authentication/signup'}>
              <a>
                {mode === 'signup'
                  ? 'Already have an account ?'
                  : "Don't have an account ?"}
              </a>
            </Link>
          </p>
        }
      >
        {mode === 'signup' && (
          <Input
            errors={getErrorMessages('name')}
            type='text'
            placeholder='Name'
            name='name'
            label='Name'
          />
        )}
        <Input
          errors={getErrorMessages('email')}
          type='email'
          placeholder='Email'
          name='email'
          label='Email'
        />
        <Input
          errors={getErrorMessages('password')}
          type='password'
          placeholder='Password'
          name='password'
          label='Password'
          showForgotPassword={mode === 'signin'}
        />
      </AuthenticationFormLayout>
      <FormState state={formState} message={message} />
    </>
  )
}
