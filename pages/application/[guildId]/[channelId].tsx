import { NextPage } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import { Messages } from 'components/Application/Messages'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'

export interface ChannelPageProps extends PagePropsWithAuthentication {
  channelId: number
  guildId: number
}

const ChannelPage: NextPage<ChannelPageProps> = (props) => {
  const { channelId, guildId, authentication } = props

  return (
    <AuthenticationProvider authentication={authentication}>
      <Head title='Thream | Application' />
      <Application
        path={{
          channelId,
          guildId
        }}
      >
        <Messages />
      </Application>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
  fetchData: async (context) => {
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
    return {
      channelId,
      guildId
    }
  }
})

export default ChannelPage
