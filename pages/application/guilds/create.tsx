import { NextPage } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'
import { CreateGuild } from 'components/Application/CreateGuild'
import { GuildsProvider } from 'contexts/Guilds'
import useTranslation from 'next-translate/useTranslation'

const CreateGuildPage: NextPage<PagePropsWithAuthentication> = (props) => {
  const { t } = useTranslation()

  return (
    <AuthenticationProvider authentication={props.authentication}>
      <GuildsProvider>
        <Head title='Thream | Create a Guild' />
        <Application
          path='/application/guilds/create'
          title={t('application:create-a-guild')}
        >
          <CreateGuild />
        </Application>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default CreateGuildPage
