import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { Authentication } from 'components/Authentication'
import { api } from 'utils/api'
import { useTheme } from 'contexts/Theme'
import { authenticationFromServerSide } from 'utils/authentication'

const Signup: React.FC = () => {
  const { theme } = useTheme()
  const { t, lang } = useTranslation()

  return (
    <>
      <Head title={`Thream | ${t('authentication:signup')}`} />
      <Authentication
        mode='signup'
        onSubmit={async (formData) => {
          await api.post(
            `/users/signup?redirectURI=${window.location.origin}/authentication/signin`,
            { ...formData, language: lang, theme }
          )
          return await t('authentication:success-signup')
        }}
      />
    </>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: false
})

export default Signup
