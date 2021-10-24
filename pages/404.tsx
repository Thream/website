import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { ErrorPage } from 'components/ErrorPage'

const Error404: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head title='Thream | 404' />

      <ErrorPage message={t('errors:page-not-found')} statusCode={404} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Error404
