import type { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Head } from '../../components/Head'
import { Authentication } from '../../components/Authentication'
import { Header } from '../../components/Header'
import type { FooterProps } from '../../components/Footer'
import { Footer } from '../../components/Footer'
import { authenticationFromServerSide } from '../../tools/authentication'

const Signup: NextPage<FooterProps> = (props) => {
  const { version } = props
  const { t } = useTranslation()

  return (
    <>
      <Head title={`Thream | ${t('authentication:signup')}`} />
      <Header />
      <Authentication mode='signup' />
      <Footer version={version} />
    </>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: false,
  fetchData: async () => {
    const { readPackage } = await import('read-pkg')
    const { version } = await readPackage()
    return { version }
  }
})

export default Signup
