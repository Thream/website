import { NextPage } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'tools/authentication'
import { CreateChannel } from 'components/Application/CreateChannel'
import { GuildsProvider } from 'contexts/Guilds'
import { GuildMember, GuildMemberProvider } from 'contexts/GuildMember'

export interface CreateChannelPageProps extends PagePropsWithAuthentication {
  guildId: number
  guildMember: GuildMember
}

const CreateChannelPage: NextPage<CreateChannelPageProps> = (props) => {
  const { guildId, authentication, guildMember } = props

  const path = { guildId }

  return (
    <AuthenticationProvider authentication={authentication}>
      <GuildsProvider>
        <GuildMemberProvider guildMember={guildMember} path={path}>
          <Head
            title={`Thream | Crée un channel`}
            description={'Crée un nouveau channel'}
          />
          <Application
            path='/application/guilds/create'
            title={'Crée un channel'}
          >
            <CreateChannel />
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
    const { data: guildMember } = await api.get(`/guilds/${guildId}`)
    return {
      guildId,
      guildMember
    }
  }
})

export default CreateChannelPage
