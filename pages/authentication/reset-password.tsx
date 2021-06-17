import { useState } from 'react'
import { GetStaticProps } from 'next'
import { AuthenticationForm } from 'components/Authentication'
import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { Main } from 'components/design/Main'
import { Footer } from 'components/Footer'
import { Input } from 'components/design/Input'
import { Button } from 'components/design/Button'
import { FormState } from 'components/design/FormState'
import { useFormState } from 'hooks/useFormState'

const ResetPassword: React.FC = () => {
  const { t } = useTranslation()
  const [formState] = useFormState()
  const [message] = useState<string | undefined>(undefined)

  return (
    <>
      <Head title={`Thream | ${t('authentication:reset-password')}`} />
      <Header />
      <Main>
        <AuthenticationForm>
          <Input
            type='password'
            placeholder='Password'
            name='password'
            label='Password'
          />
          <Button className='w-full mt-6' type='submit'>
            {t('authentication:submit')}
          </Button>
        </AuthenticationForm>
        <FormState state={formState} message={message} />
      </Main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default ResetPassword
