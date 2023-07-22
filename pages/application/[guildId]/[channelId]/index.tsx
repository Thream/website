import type { NextPage } from 'next'

import { Head } from '../../../../components/Head'
import { Application } from '../../../../components/Application'
import { Messages } from '../../../../components/Application/Messages'
import { SendMessage } from '../../../../components/Application/SendMessage'
import type { PagePropsWithAuthentication } from '../../../../tools/authentication'
import {
  authenticationFromServerSide,
  AuthenticationProvider
} from '../../../../tools/authentication'
import type { GuildMember } from '../../../../contexts/GuildMember'
import { GuildMemberProvider } from '../../../../contexts/GuildMember'
import { GuildLeftSidebar } from '../../../../components/Application/GuildLeftSidebar'
import { ChannelsProvider } from '../../../../contexts/Channels'
import { GuildsProvider } from '../../../../contexts/Guilds'
import type { Channel } from '../../../../models/Channel'
import { MessagesProvider } from '../../../../contexts/Messages'
import { MembersProviders } from '../../../../contexts/Members'

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
        <GuildMemberProvider guildMember={guildMember} path={path}>
          <MembersProviders path={path}>
            <ChannelsProvider path={path}>
              <MessagesProvider path={path}>
                <Head title={`Thream | ${selectedChannel.name}`} />
                <Application
                  path={path}
                  guildLeftSidebar={<GuildLeftSidebar path={path} />}
                  title={`# ${selectedChannel.name}`}
                >
                  <Messages />
                  <SendMessage path={path} />
                </Application>
              </MessagesProvider>
            </ChannelsProvider>
          </MembersProviders>
        </GuildMemberProvider>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
  fetchData: async (context, api) => {
    const channelId = Number(context?.params?.['channelId'])
    const guildId = Number(context?.params?.['guildId'])
    if (Number.isNaN(channelId) || Number.isNaN(guildId)) {
      return {
        notFound: true
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
