import { Head } from 'components/Head'
import { authenticationFromServerSide } from 'utils/authentication'
import { Application, ApplicationProps } from 'components/Application'
import { Messages } from 'components/Messages'
import { Messages as MessagesType, MessagesProvider } from 'contexts/Messages'
import { Guild } from 'contexts/Guilds'
import { SendMessage } from 'components/SendMessage'

export interface ChannelPageProps extends ApplicationProps {
  guild: Guild
  messages: MessagesType
  channelId: string
  guildId: string
}

const ChannelPage: React.FC<ChannelPageProps> = (props) => {
  return (
    <>
      <Head title={props.guild.name} />
      <Application authentication={props.authentication} guilds={props.guilds}>
        <MessagesProvider messages={props.messages} channelId={props.channelId}>
          <Messages />
          <SendMessage channelId={props.channelId} />
        </MessagesProvider>
      </Application>
    </>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
  fetchData: async (api, context) => {
    const { channelId, guildId } = context.params as {
      channelId: string
      guildId: string
    }
    const { data: guild } = await api.get(`/guilds/${guildId}`)
    const { data: messages } = await api.get(`/channels/${channelId}/messages`)
    const { data: guilds } = await api.get('/guilds')
    return { guild, guilds, messages, channelId, guildId }
  }
})

export default ChannelPage
