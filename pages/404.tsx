import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { ErrorPage } from 'components/ErrorPage'
import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

const Error404: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head title='Divlo - 404' />

      <Header />
      <main className='flex flex-col md:mx-auto md:max-w-4xl lg:max-w-7xl'>
        <ErrorPage statusCode={404} message={t('errors:page-not-found')} />
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Error404
