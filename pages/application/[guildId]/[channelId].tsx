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
import { ChannelsProvider } from 'contexts/Channels'
import { GuildsProvider } from 'contexts/Guilds'
import { Channel } from 'models/Channel'

export interface ChannelPageProps extends PagePropsWithAuthentication {
  channelId: number
  guildId: number
  guildMember: GuildMember
  selectedChannel: Channel
}

const ChannelPage: NextPage<ChannelPageProps> = (props) => {
  const { channelId, guildId, authentication, guildMember, selectedChannel } =
    props

  const path = {
    channelId,
    guildId
  }

  return (
    <AuthenticationProvider authentication={authentication}>
      <GuildsProvider>
        <GuildMemberProvider guildMember={guildMember}>
          <ChannelsProvider path={path}>
            <Head title='Thream | Application' />
            <Application
              path={path}
              guildLeftSidebar={<GuildLeftSidebar path={path} />}
              title={`# ${selectedChannel.name}`}
            >
              <Messages />
            </Application>
          </ChannelsProvider>
        </GuildMemberProvider>
      </GuildsProvider>
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
    const { data: selectedChannelData } = await api.get(
      `/channels/${channelId}`
    )
    return {
      channelId,
      guildId,
      guildMember,
      selectedChannel: selectedChannelData.channel
    }
  }
})

export default ChannelPage
