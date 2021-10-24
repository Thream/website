import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { Authentication } from 'components/Authentication'
import { Header } from 'components/Header'
import { Footer, FooterProps } from 'components/Footer'
import { authenticationFromServerSide } from 'utils/authentication'
import { ScrollableBody } from 'components/ScrollableBody'

const Signin: React.FC<FooterProps> = (props) => {
  const { version } = props
  const { t } = useTranslation()

  return (
    <ScrollableBody>
      <Head title={`Thream | ${t('authentication:signup')}`} />
      <Header />
      <Authentication mode='signin' />
      <Footer version={version} />
    </ScrollableBody>
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

export default Signin
