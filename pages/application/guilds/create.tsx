import type { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Head } from '../../../components/Head'
import { Application } from '../../../components/Application'
import type { PagePropsWithAuthentication } from '../../../tools/authentication'
import {
  authenticationFromServerSide,
  AuthenticationProvider
} from '../../../tools/authentication'
import { CreateGuild } from '../../../components/Application/CreateGuild'
import { GuildsProvider } from '../../../contexts/Guilds'

const CreateGuildPage: NextPage<PagePropsWithAuthentication> = (props) => {
  const { t } = useTranslation()

  return (
    <AuthenticationProvider authentication={props.authentication}>
      <GuildsProvider>
        <Head
          title={`Thream | ${t('application:create-a-guild')}`}
          description={t('application:create-a-guild-description')}
        />
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
