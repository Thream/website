import type { NextPage } from "next"

import { Head } from "../../../../components/Head"
import { Application } from "../../../../components/Application"
import type { PagePropsWithAuthentication } from "../../../../tools/authentication"
import {
  authenticationFromServerSide,
  AuthenticationProvider,
} from "../../../../tools/authentication"
import type { GuildMember } from "../../../../contexts/GuildMember"
import { GuildMemberProvider } from "../../../../contexts/GuildMember"
import { GuildLeftSidebar } from "../../../../components/Application/GuildLeftSidebar"
import { ChannelSettings } from "../../../../components/Application/ChannelSettings"
import { ChannelsProvider } from "../../../../contexts/Channels"
import { GuildsProvider } from "../../../../contexts/Guilds"
import type { Channel } from "../../../../models/Channel"
import { MembersProviders } from "../../../../contexts/Members"

export interface ChannelSettingsPageProps extends PagePropsWithAuthentication {
  channelId: number
  guildId: number
  guildMember: GuildMember
  selectedChannel: Channel
}

const ChannelSettingsPage: NextPage<ChannelSettingsPageProps> = (props) => {
  const { channelId, guildId, authentication, guildMember, selectedChannel } =
    props

  const path = {
    channelId,
    guildId,
  }

  return (
    <AuthenticationProvider authentication={authentication}>
      <GuildsProvider>
        <GuildMemberProvider guildMember={guildMember} path={path}>
          <MembersProviders path={path}>
            <ChannelsProvider path={path}>
              <Head title={`Thream | ${selectedChannel.name}`} />
              <Application
                path={path}
                guildLeftSidebar={<GuildLeftSidebar path={path} />}
                title={`# ${selectedChannel.name}`}
              >
                <ChannelSettings channel={selectedChannel} />
              </Application>
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
    const channelId = Number(context?.params?.["channelId"])
    const guildId = Number(context?.params?.["guildId"])
    if (Number.isNaN(channelId) || Number.isNaN(guildId)) {
      return {
        notFound: true,
      }
    }
    const { data: guildMember } = await api.get<GuildMember>(
      `/guilds/${guildId}`,
    )
    if (!guildMember.member.isOwner) {
      return {
        notFound: true,
      }
    }
    const { data: selectedChannelData } = await api.get(
      `/channels/${channelId}`,
    )
    return {
      channelId,
      guildId,
      guildMember,
      selectedChannel: selectedChannelData.channel,
    }
  },
})

export default ChannelSettingsPage
