import type { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Head } from '../../../components/Head'
import { Application } from '../../../components/Application'
import type { PagePropsWithAuthentication } from '../../../tools/authentication'
import {
  authenticationFromServerSide,
  AuthenticationProvider
} from '../../../tools/authentication'
import { JoinGuildsPublic } from '../../../components/Application/JoinGuildsPublic'
import { GuildsProvider } from '../../../contexts/Guilds'

const JoinGuildPage: NextPage<PagePropsWithAuthentication> = (props) => {
  const { t } = useTranslation()

  return (
    <AuthenticationProvider authentication={props.authentication}>
      <GuildsProvider>
        <Head
          title={`Thream | ${t('application:join-a-guild')}`}
          description={t('application:join-a-guild-description')}
        />
        <Application
          path='/application/guilds/join'
          title={t('application:join-a-guild')}
        >
          <JoinGuildsPublic />
        </Application>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default JoinGuildPage
