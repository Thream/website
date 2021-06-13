import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { Authentication } from 'components/Authentication'

const Signin: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head title={`Thream | ${t('authentication:signup')}`} />
      <Authentication mode='signin' />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Signin
