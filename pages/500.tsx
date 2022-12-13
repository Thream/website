import type { GetStaticProps, NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { ErrorPage } from '../components/ErrorPage'
import { Head } from '../components/Head'
import { Header } from '../components/Header'
import type { FooterProps } from '../components/Footer'

const Error500: NextPage<FooterProps> = (props) => {
  const { t } = useTranslation()
  const { version } = props

  return (
    <>
      <Head title='Thream | 500' />

      <Header />
      <ErrorPage
        statusCode={500}
        message={t('errors:server-error')}
        version={version}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<FooterProps> = async () => {
  const { readPackage } = await import('read-pkg')
  const { version } = await readPackage()
  return { props: { version } }
}

export default Error500
