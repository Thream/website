import { NextPage } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import { Messages } from 'components/Application/Messages'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'
import { GuildMember, GuildMemberProvider } from 'contexts/GuildMember'
import { GuildLeftSidebar } from 'components/Application/GuildLeftSidebar'

export interface ChannelPageProps extends PagePropsWithAuthentication {
  channelId: number
  guildId: number
  guildMember: GuildMember
}

const ChannelPage: NextPage<ChannelPageProps> = (props) => {
  const { channelId, guildId, authentication, guildMember } = props

  return (
    <AuthenticationProvider authentication={authentication}>
      <GuildMemberProvider guildMember={guildMember}>
        <Head title='Thream | Application' />
        <Application
          path={{
            channelId,
            guildId
          }}
          guildLeftSidebar={
            <GuildLeftSidebar
              path={{
                channelId,
                guildId
              }}
            />
          }
        >
          <Messages />
        </Application>
      </GuildMemberProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
  fetchData: async (context, api) => {
    const channelId = Number(context?.params?.channelId)
    const guildId = Number(context?.params?.guildId)
    if (isNaN(channelId) || isNaN(guildId)) {
      return {
        redirect: {
          destination: '/application',
          permanent: false
        }
      }
    }
    const { data: guildMember } = await api.get(`/guilds/${guildId}`)
    return {
      channelId,
      guildId,
      guildMember
    }
  }
})

export default ChannelPage
