import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { Authentication } from 'components/Authentication'

const Signup: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head title={`Thream | ${t('authentication:signup')}`} />
      <Authentication mode='signup' />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Signup
