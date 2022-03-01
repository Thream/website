import { NextPage } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'tools/authentication'
import { GuildMember, GuildMemberProvider } from 'contexts/GuildMember'
import { GuildsProvider } from 'contexts/Guilds'
import { GuildSettings } from 'components/Application/GuildSettings'

export interface GuildSettingsPageProps extends PagePropsWithAuthentication {
  guildId: number
  guildMember: GuildMember
}

const GuildSettingsPage: NextPage<GuildSettingsPageProps> = (props) => {
  const { guildId, authentication, guildMember } = props

  const path = { guildId }

  return (
    <AuthenticationProvider authentication={authentication}>
      <GuildsProvider>
        <GuildMemberProvider guildMember={guildMember} path={path}>
          <Head title='Thream | Guild settings' />
          <Application path={path} title='Guild settings'>
            <GuildSettings />
          </Application>
        </GuildMemberProvider>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
  fetchData: async (context, api) => {
    const guildId = Number(context?.params?.guildId)
    if (isNaN(guildId)) {
      return {
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }
    const { data: guildMember } = await api.get<GuildMember>(
      `/guilds/${guildId}`
    )
    return {
      guildId,
      guildMember
    }
  }
})

export default GuildSettingsPage
