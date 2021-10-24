import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { ErrorPage } from 'components/ErrorPage'

const Error500: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head title='Thream | 500' />

      <ErrorPage message={t('errors:server-error')} statusCode={500} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Error500
