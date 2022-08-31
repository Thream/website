import type { GetStaticProps, NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { ErrorPage } from '../components/ErrorPage'
import { Head } from '../components/Head'
import { Header } from '../components/Header'
import type { FooterProps } from '../components/Footer'
import { Footer } from '../components/Footer'

const Error404: NextPage<FooterProps> = (props) => {
  const { t } = useTranslation()
  const { version } = props

  return (
    <>
      <Head title='Thream | 404' />

      <Header />
      <main className='flex flex-col md:mx-auto md:max-w-4xl lg:max-w-7xl'>
        <ErrorPage statusCode={404} message={t('errors:page-not-found')} />
      </main>
      <Footer version={version} />
    </>
  )
}

export const getStaticProps: GetStaticProps<FooterProps> = async () => {
  const { readPackage } = await import('read-pkg')
  const { version } = await readPackage()
  return { props: { version } }
}

export default Error404
