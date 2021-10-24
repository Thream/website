import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

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
    trim: true
  }
}

export const nameSchema: ValidatorSchema = {
  name: {
    type: 'string',
    min: 3,
    max: 30,
    trim: true
  }
}

export const passwordSchema: ValidatorSchema = {
  password: {
    type: 'string',
    empty: false,
    trim: true
  }
}

export const AuthenticationForm: React.FC<AuthenticationProps> = (props) => {
  const { mode, onSubmit } = props

  const { t } = useTranslation()
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
                  ? t('authentication:already-have-an-account')
                  : t('authentication:dont-have-an-account')}
              </a>
            </Link>
          </p>
        }
      >
        {mode === 'signup' && (
          <Input
            errors={getErrorMessages('name')}
            type='text'
            placeholder={t('authentication:name')}
            name='name'
            label={t('authentication:name')}
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
          placeholder={t('authentication:password')}
          name='password'
          label={t('authentication:password')}
          showForgotPassword={mode === 'signin'}
        />
      </AuthenticationFormLayout>
      <FormState state={formState} message={message} />
    </>
  )
}
