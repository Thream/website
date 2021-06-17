import { useState } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { SocialMediaButton } from 'components/design/SocialMediaButton'
import { Header } from 'components/Header'
import { Main } from 'components/design/Main'
import { Footer } from 'components/Footer'
import { Input } from 'components/design/Input'
import { Button } from 'components/design/Button'
import { FormState } from 'components/design/FormState'
import { useFormState } from 'hooks/useFormState'
import { AuthenticationForm } from './'

export interface AuthenticationProps {
  mode: 'signup' | 'signin'
}

export const Authentication: React.FC<AuthenticationProps> = (props) => {
  const { mode } = props
  const { t } = useTranslation()
  const [formState] = useFormState()
  const [message] = useState<string | undefined>(undefined)

  return (
    <>
      <Header />
      <Main>
        <section className='flex flex-col sm:items-center sm:w-full'>
          <div className='flex flex-col items-center justify-center space-y-6 sm:w-4/6 sm:flex-row sm:space-x-6 sm:space-y-0'>
            <SocialMediaButton socialMedia='Google' />
            <SocialMediaButton socialMedia='GitHub' />
            <SocialMediaButton socialMedia='Discord' />
          </div>
        </section>
        <section className='text-center text-lg font-paragraph pt-8'>
          {t('authentication:or')}
        </section>
        <AuthenticationForm>
          {mode === 'signup' && (
            <Input
              type='text'
              placeholder={t('authentication:name')}
              name='name'
              label={t('authentication:name')}
            />
          )}
          <Input type='email' placeholder='Email' name='email' label='Email' />
          <Input
            type='password'
            placeholder={t('authentication:password')}
            name='password'
            label={t('authentication:password')}
            showForgotPassword={mode === 'signin'}
          />
          <Button className='w-full mt-6' type='submit'>
            {t('authentication:submit')}
          </Button>
          <p className='mt-3 font-headline text-sm text-green-800 dark:text-green-400 hover:underline'>
            <Link
              href={
                mode === 'signup'
                  ? '/authentication/signin'
                  : '/authentication/signup'
              }
            >
              <a>
                {mode === 'signup'
                  ? t('authentication:already-have-an-account')
                  : t('authentication:dont-have-an-account')}
              </a>
            </Link>
          </p>
        </AuthenticationForm>
        <FormState state={formState} message={message} />
      </Main>
      <Footer />
    </>
  )
}
