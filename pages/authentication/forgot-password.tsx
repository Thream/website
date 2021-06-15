import { useState } from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Form from 'react-component-form'
import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { Main } from 'components/design/Main'
import { Footer } from 'components/Footer'
import { Input } from 'components/design/Input'
import { Button } from 'components/design/Button'
import { FormState } from 'components/design/FormState'
import { useFormState } from 'hooks/useFormState'

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation()
  const [formState] = useFormState()
  const [message] = useState<string | undefined>(undefined)

  return (
    <>
      <Head title={`Thream | ${t('authentication:forgot-password')}`} />
      <Header />
      <Main>
        <Form className='w-4/6 max-w-xs'>
          <Input type='email' placeholder='Email' name='email' label='Email' />
          <Button className='w-full mt-6' type='submit'>
            {t('authentication:submit')}
          </Button>
          <p className='mt-3 font-headline text-sm text-green-800 dark:text-green-400 hover:underline'>
            <Link href='/authentication/signin'>
              <a>{t('authentication:already-know-password')}</a>
            </Link>
          </p>
        </Form>
        <FormState state={formState} message={message} />
      </Main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default ForgotPassword
